import { spawn } from "child_process";
import { mkdtemp, rmdir, unlink, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

export type Language = "java" | "python" | "c++";

export interface CompilationResult {
	language: Language;
	compiled: Buffer;
}

export async function compile(language: Language, filename: string, code: string): Promise<CompilationResult | "error"> {
	if (language === "java") {
		if (!filename.endsWith(".java"))
			return "error";
		const basename = filename.substring(0, filename.length - ".java".length);
		const tempDir = await mkdtemp(join(tmpdir(), "shellhacks2024-"));
		const tmpfile = join(tempDir, basename + ".java");
		await writeFile(tmpfile, code, "utf-8");
		const proc = spawn("docker", [
			"run",
			"--rm",
			"-v", `:/home/java/${basename}.java`,
			"-t", "cgr.dev/chainguard/jdk:latest",
			"sh", "-c", `javac /home/java/${basename}.java && cat /home/java/${basename}.class`,
		]);
		return await new Promise(resolve => {
			const chunks: any[] = [];
			proc.stdout.on("data", chunk => {
				chunks.push(chunk);
			});
			proc.on("close", async code => {
				await unlink(tmpfile);
				await rmdir(tempDir);
				if (code === 0) {
					resolve({
						language: "java",
						compiled: Buffer.concat(chunks),
					});
				}
				else {
					resolve("error");
				}
			});
		});
	}
	else {
		return "error";
	}
}
