import { NextApiResponse } from "next";
import { IEnvironment, EnvironmentState } from "../types";

const stateTransitions: Record<EnvironmentState, EnvironmentState[]> = {
  pending: ["building"],
  building: ["publishing", "failed"],
  publishing: ["provisioning", "failed"],
  provisioning: ["available", "failed"],
  available: ["closed"],
  failed: [],
  closed: [],
};

class EnvironmentManager {
  private environments: IEnvironment[] = [];
  private subscribedCalls: NextApiResponse[] = [];

  subscribe(res: NextApiResponse) {
    this.subscribedCalls.push(res);

    // Send the initial data to the subscriber
    res.write(`data: ${JSON.stringify(this.environments)}\n\n`);

    return () => {
      this.subscribedCalls = this.subscribedCalls.filter((sub) => sub !== res);
    };
  }

  private notifySubscribers() {
    console.log("notifying");
    console.log(this.subscribedCalls.length);
    for (const res of this.subscribedCalls) {
      console.log("resolving calls");
      res.write(`data: ${JSON.stringify(this.environments)}\n\n`);
    }
  }

  getEnvironments() {
    return this.environments;
  }

  addEnvironment(environment: IEnvironment) {
    this.environments.push(environment);
    this.notifySubscribers();
  }

  deleteEnvironment(id: string) {
    this.environments = this.environments.filter((env) => env.id !== id);
    this.notifySubscribers();
  }

  closeEnvironment(id: string) {
    this.environments = this.environments.map((env) =>
      env.id === id ? { ...env, state: "closed" } : env
    );
    this.notifySubscribers();
  }
}

export const getNextState = (
  currentState: EnvironmentState
): EnvironmentState | null => {
  const possibleTransitions = stateTransitions[currentState];
  if (possibleTransitions.length === 0) return null;
  const nextState =
    possibleTransitions[Math.floor(Math.random() * possibleTransitions.length)];
  return nextState;
};

const _environmentManager = new EnvironmentManager();
export const environmentManager = _environmentManager;
