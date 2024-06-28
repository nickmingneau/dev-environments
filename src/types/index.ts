export interface IEnvironment {
  id: string;
  name: string;
  branch: string;
  database: string;
  publicUrl: string;
  state: string;
}

export type EnvironmentState =
  | "pending"
  | "building"
  | "publishing"
  | "provisioning"
  | "available"
  | "failed"
  | "closed";
