export async function load({ cookies, depends }) {
  const token = cookies.get("token");
  depends("cookie:token");

  return { token };
}
