import { spawn } from "child_process";
import { mkdtemp, readFile, rmdir, unlink, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import z from "zod";

export const Language = z.union([
	z.literal("java"),
	z.literal("python"),
	z.literal("c++"),
]);
export type Language = z.TypeOf<typeof Language>;

export const JudgeVerdict = z.union([
	z.literal("accepted"),
	z.literal("wrong-answer"),
	z.literal("compile-error"),
	z.literal("time-limit"),
]);
export type JudgeVerdict = z.TypeOf<typeof JudgeVerdict>;

export interface CompilationResult {
	language: Language;
	basename: string;
	compiled: Buffer;
}

const COMPILATION_TIME_LIMIT = 3000;
const EXECUTION_TIME_LIMIT = 4000;

export async function compile(language: Language, filename: string, code: string): Promise<CompilationResult | "error"> {
	if (language === "java") {
		if (!filename.endsWith(".java")) {
			return "error";
		}
		const basename = filename.substring(0, filename.length - ".java".length);
		const tempDir = await mkdtemp(join(tmpdir(), "shellhacks2024-"));
		const tmpfile = join(tempDir, basename + ".java");
		await writeFile(tmpfile, code, "utf-8");
		const proc = spawn("docker", [
			"run",
			"--rm",
			"-v", `${tmpfile}:/home/java/${basename}.java`,
			"-t", "cgr.dev/chainguard/jdk:latest",
			"sh", "-c", `cd /home/java && javac ${basename}.java && xxd -p ${basename}.class`,
		]);
		const killTimeout = setTimeout(() => {
			proc.kill("SIGKILL");
		}, COMPILATION_TIME_LIMIT);
		return await new Promise(resolve => {
			const chunks: any[] = [];
			const errorChunks: any[] = [];
			proc.stdout.on("data", chunk => {
				chunks.push(chunk);
			});
			proc.stderr.on("data", chunk => {
				errorChunks.push(chunk);
			});
			proc.on("close", async code => {
				clearTimeout(killTimeout);
				await unlink(tmpfile);
				await rmdir(tempDir);
				if (code === 0) {
					resolve({
						language: "java",
						basename,
						compiled: Buffer.from(Buffer.concat(chunks).toString("utf-8").replace(/\s+/g, ""), "hex"),
					});
				}
				else {
					console.log(Buffer.concat(chunks).toString("utf-8"));
					console.log(Buffer.concat(errorChunks).toString("utf-8"));
					resolve("error");
				}
			});
		});
	}
	else if (language === "python") {
		if (!filename.endsWith(".py")) {
			return "error";
		}

		return {
			basename: filename.substring(0, filename.length - ".py".length),
			compiled: Buffer.from(code, "utf-8"),
			language: "python",
		};
	}
	else {
		return "error";
	}
}

export async function run(compiled: CompilationResult, input: string): Promise<{
	stdout: string;
	stderr: string;
	exitCode: number;
}> {
	if (compiled.language === "java") {
		const basename = compiled.basename;
		const tempDir = await mkdtemp(join(tmpdir(), "shellhacks2024-"));
		const tmpfile1 = join(tempDir, basename + ".class");
		await writeFile(tmpfile1, compiled.compiled);
		const tmpfile2 = join(tempDir, "input.txt");
		await writeFile(tmpfile2, input, "utf-8");
		const proc = spawn("docker", [
			"run",
			"--rm",
			"-v", `${tmpfile1}:/home/java/${basename}.class`,
			"-v", `${tmpfile2}:/home/java/input.txt`,
			"-t", "cgr.dev/chainguard/jdk:latest",
			"sh", "-c", `cd /home/java && java ${basename} < input.txt`,
		]);
		const killTimeout = setTimeout(() => {
			proc.kill("SIGKILL");
		}, EXECUTION_TIME_LIMIT);
		return await new Promise(resolve => {
			const chunks: any[] = [];
			const errorChunks: any[] = [];
			proc.stdout.on("data", chunk => {
				chunks.push(chunk);
			});
			proc.stderr.on("data", chunk => {
				errorChunks.push(chunk);
			});
			proc.on("close", async code => {
				clearTimeout(killTimeout);
				await unlink(tmpfile1);
				await unlink(tmpfile2);
				await rmdir(tempDir);
				resolve({
					stdout: Buffer.concat(chunks).toString("utf-8").replace(/\r\n/g, "\n"),
					stderr: Buffer.concat(errorChunks).toString("utf-8").replace(/\r\n/g, "\n"),
					exitCode: code ?? -1,
				});
			});
		});
	}
	else if (compiled.language === "python") {
		const basename = compiled.basename;
		const tempDir = await mkdtemp(join(tmpdir(), "shellhacks2024-"));
		const tmpfile1 = join(tempDir, basename + ".py");
		await writeFile(tmpfile1, compiled.compiled);
		const proc = spawn("docker", [
			"run",
			"--rm",
			"-v", `${tmpfile1}:/home/python/${basename}.py`,
			"-i", "cgr.dev/chainguard/python:latest",
			`/home/python/${basename}.py`,
		]);
		proc.stdin.end(Buffer.from(input, "utf-8"));
		const killTimeout = setTimeout(() => {
			proc.kill("SIGKILL");
		}, EXECUTION_TIME_LIMIT);
		return await new Promise(resolve => {
			const chunks: any[] = [];
			const errorChunks: any[] = [];
			proc.stdout.on("data", chunk => {
				chunks.push(chunk);
			});
			proc.stderr.on("data", chunk => {
				errorChunks.push(chunk);
			});
			proc.on("close", async code => {
				clearTimeout(killTimeout);
				await unlink(tmpfile1);
				await rmdir(tempDir);
				resolve({
					stdout: Buffer.concat(chunks).toString("utf-8").replace(/\r\n/g, "\n"),
					stderr: Buffer.concat(errorChunks).toString("utf-8").replace(/\r\n/g, "\n"),
					exitCode: code ?? -1,
				});
			});
		});
	}
	else {
		throw new Error("unsupported");
	}
}
