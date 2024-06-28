import { NextApiRequest, NextApiResponse } from "next";
import { environmentManager } from "../../../utils/environmentManager";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const environments = environmentManager.getEnvironments();
      res.status(200).json(environments);
      break;

    case "POST":
      const environment = req.body;
      environmentManager.addEnvironment(environment);
      res.status(200).json({ message: "Environment created", environment });
      break;

    case "DELETE":
      const envId = req.query.id as string;
      environmentManager.deleteEnvironment(envId);
      res.status(200).json({ message: "Environment deleted" });
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
};

export default handler;
