export async function load({ cookies, depends }) {
  const token = cookies.get("token");
  depends("cookies:token");

  return { token };
}
