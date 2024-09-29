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
    if (!data.users.find(x => x.password === password)) {
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
    
    const token = crypto.randomUUID();
  
    return json({
      success: true,
      token,
    });
}
  