import { error, json } from "@sveltejs/kit";
import z from "zod";
import type { APIErrors } from "$lib/api.js";
import { data, saveData } from "$lib/server/db";

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

    if (!data.users.find(x => x.username === username)) {
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
    const user = data.users.find(x => x.password === password);
    if (!user) {
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
  