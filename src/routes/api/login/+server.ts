import { error, json } from "@sveltejs/kit";
import z from "zod";
import type { APIErrors } from "$lib/api.js";
import { data, saveData } from "$lib/server/db";
import argon2 from "argon2";

const schema = z.object({
    username: z.string(),
    password: z.string()
});

export type FormResponse =
  | {
      success: true;
      token: string;
    }
  | APIErrors;

export async function POST({ request, fetch, cookies }) {
    const input = schema.safeParse(await request.json());
    if (!input.success) {
      return json({
        success: false,
        errors: input.error.flatten(),
      });
    }
  
    const { username, password } = input.data;

    const user = data.users.find(x => x.username === username);
    if (!user) {
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That username is not found"
          },
        },
      });
    }

    // at one point during development, we stored plaintext passwords
    // this automatically hashes them on access
    if ("password" in user) {
      if (password === user.password) {
        delete user["password"];
        user.passwordHash = await argon2.hash(password);
        saveData();
      }
    }

    if (!await argon2.verify(user.passwordHash, password)) {
        return json({
          success: false,
          errors: {
            formErrors: [],
            fieldErrors: {
              username: "That password is not found"
            },
          },
        });
      }
    if (argon2.needsRehash(user.passwordHash)) {
      user.passwordHash = await argon2.hash(password);
      saveData();
    }

    cookies.set("token", user.token, {
      path: "/",
      sameSite: "strict",
      secure: true,
      httpOnly: false,
      maxAge: 3600 * 24 * 30,
    });
  
    return json({
      success: true,
      token: user.token,
    });
}
  