import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getSession = async (req: any) => {
  return await getServerSession(req, authOptions);
};

export const requireAuth = async (req: any, res: any) => {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return session;
};
