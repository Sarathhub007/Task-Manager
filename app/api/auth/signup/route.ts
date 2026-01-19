import { prisma}  from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

type SignupBody = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: SignupBody = await req.json();
    const { name, email, password } = body;

    // 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
