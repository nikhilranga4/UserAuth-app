import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Check if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Failed to create account" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
