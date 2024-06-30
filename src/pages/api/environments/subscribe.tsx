import { NextApiRequest, NextApiResponse } from "next";
import { environmentManager } from "../../../utils/environmentManager";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Content-Encoding", "none");

    const unsubscribe = environmentManager.subscribe(res);

    req.on("close", () => {
      unsubscribe();
      res.end();
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
