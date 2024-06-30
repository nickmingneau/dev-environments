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

    res.write(`data: ${JSON.stringify(this.environments)}\n\n`);

    return () => {
      this.subscribedCalls = this.subscribedCalls.filter((sub) => sub !== res);
    };
  }

  private notifySubscribers() {
    for (const res of this.subscribedCalls) {
      res.write(`data: ${JSON.stringify(this.environments)}\n\n`);
    }
  }

  getEnvironments(): IEnvironment[] {
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
    this.updateEnvironmentState(id, "closed");
  }

  updateEnvironmentState(id: string, newState: EnvironmentState) {
    this.environments = this.environments.map((env) =>
      env.id === id ? { ...env, state: newState } : env
    );
    this.notifySubscribers();
  }

  startStateTransitions() {
    setInterval(() => {
      this.environments.forEach((env) => {
        const nextState = getNextState(env.state as EnvironmentState);
        if (env.state !== "available " && nextState) {
          this.updateEnvironmentState(env.id, nextState);
        }
      });
    }, 5000);
  }
}

export const getNextState = (
  currentState: EnvironmentState
): EnvironmentState | null => {
  const possibleTransitions = stateTransitions[currentState];
  if (possibleTransitions.length === 0) return null;
  const nextState =
    possibleTransitions[
      Math.floor(Math.random() * 10) < 1 ? possibleTransitions.length - 1 : 0
    ];
  return nextState;
};

const _environmentManager = new EnvironmentManager();
export const environmentManager = _environmentManager;

environmentManager.startStateTransitions();
