import { data } from "$lib/server/db.js";

export async function load({ cookies, depends }) {
  const token = cookies.get("token");
  depends("cookies:token");

  const username = data.users.find(x => x.token === token)?.username;

  return { username, token };
}
