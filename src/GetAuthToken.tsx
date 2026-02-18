import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function GetTokenAuth() {
  const cookieStore = cookies();
  console.log("All cookies:", (await cookieStore).getAll());

  const possibleNames = [
    "next-auth.session-token",
    "__Secure-next-auth.session-token",
  ];

  let authToken: string | undefined;

  for (const name of possibleNames) {
    const c = (await cookieStore).get(name);
    if (c) {
      authToken = c.value;
      console.log(`Using cookie: ${name}`);
      break;
    }
  }

  if (!authToken) return null;

  try {
    const token = await decode({
      token: authToken,
      secret: process.env.AUTH_SECRET!,
    });
    return token?.token ?? null;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
}
