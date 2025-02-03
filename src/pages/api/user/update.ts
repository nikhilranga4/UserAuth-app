import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "You must be signed in" });
    }

    const { fullName, fbLink, linkedinLink, gender, dob } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: fullName,
          fbLink,
          linkedinLink,
          gender,
          dob: new Date(dob),
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Failed to update profile" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
