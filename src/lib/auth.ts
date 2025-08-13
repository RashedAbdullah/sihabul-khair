import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PRIVATE_ACCESS_TOKEN_SECRET!
    );
    const { payload } = await jwtVerify(token, secret);

    return payload as {
      _id: string;
      name: string;
      email: string;
      avatar: string;
      role: "ADMIN" | "USER" | "MEMBER";
      iat: number;
      exp: number;
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
