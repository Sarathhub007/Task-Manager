import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
