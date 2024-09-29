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

    if (data.users.find(x => x.username === username)) {
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That username is already taken"
          },
        },
      });
    }
    if (username.length < 3){
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That username is too short"
          },
        },
      });
    }
    if (username.length > 20){
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That username is too long"
          },
        },
      });
    }
    if (password.length < 6){
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That password is too short"
          },
        },
      });
    }
    if (password.length > 1024){
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "That password is too long"
          },
        },
      });
    }
    if (!isValidIdentifier(username)){
      return json({
        success: false,
        errors: {
          formErrors: [],
          fieldErrors: {
            username: "The username cannot contain special characters"
          },
        },
      });
    }
    
    // add password checks

    const token = crypto.randomUUID();
    data.users.push({
      username, password, token,
    });
    saveData();
  
    return json({
      success: true,
      token,
    });
}

function isValidIdentifier(str: string): boolean {
  return /^[A-Za-z0-9_]+$/.test(str);
}
  