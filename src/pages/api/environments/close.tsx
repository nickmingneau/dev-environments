import { NextApiRequest, NextApiResponse } from "next";
import { environmentManager } from "../../../utils/environmentManager";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const envId = req.query.id as string;
    environmentManager.closeEnvironment(envId);
    res.status(200).json({ message: "Environment closed" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
