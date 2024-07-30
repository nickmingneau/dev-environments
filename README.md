# Technical assignment

## Context

This is a technical test i made for a company to prove my Frontend Development capabilities.
I completed the task in roughly three hours according to the specifications below.

## Introduction

This technical assignment's goal is to get a better understanding of your current technical skills. The result of this
assignment will determine the next steps in the hiring process.

## Assignment

Create a small Next.js application with a basic UI, including a navigation, sidebar, content, and a footer with basic
information about yourself and the application.

The main feature of this app is to maintain a list of development environments. Each environment consists of a name,
a branch name, a database name, a ticket number.

```typescript
interface IEnvironment {
  id: string;
  name: string;
  branch: string;
  database: string;
  publicUrl: string;
  state: string;
}
```

Each environment has a state machine, which is represented by this table:

| From         | To           | Event     | Description                                               |
| ------------ | ------------ | --------- | --------------------------------------------------------- | ----------------------------- |
| \*           | pending      |  create   |  A new environment has been created: generate a unique ID |
| pending      | building     | build     | Build has started                                         |
| building     | publishing   | publish   | Build is done and                                         | artefacts are being published |
| building     | failed       | failed    | Failed to build                                           |
| publishing   | provisioning | provision | Provisioning the new environment on the server            |
| publishing   | failed       | failed    | Failed to publish                                         |
| provisioning | available    | done      | New environment is ready and available on publicUrl       |
| provisioning | failed       | failed    | Failed to provision                                       |
| available    | closed       | close     | Environment closed and resources have been deallocated    |

## Create Environment

Create the necessary views/pages to CREATE a new environment. The branch name should be a dropdown with branch names from the Git repository (use a static list with some random branch names).

A branch can only be used once. Filter out the branch names which have already been used in other environments.

### Simulate States

When a new environment has been created, simulate running it through the state machine. Build a small backend server/api which exposes an endpoint called /provision, which receives a JSON object:

```json
{
  "id": "envId",
  "name": "Env Name",
  "branch": "Branch Name X",
  "database": "database_name_1"
}
```

The API should run the environment through the state machine, which can randomly fail. The current state should be visible on the frontend. You can use random delays to simulate a long running "provisioning".

### List Environments

List all available environments (not closed) and their current state. Only if the state is done, allow clicking on the environment to navigate to the publicUrl. The environment state should be "LIVE".

### Close Environments

Allow the user to close an existing environment, only if the environment is in a "done" state. Make sure the user confirms that he is going to close the environment.

## Timing

You decide yourself how much time and effort you invest in it, but quality(!) and a reasonable delivery time are
always highly appreciated. Please send us an email (jobs@clubee.com) when you think the assignment is ready for
review. Please mention your name, Github username, and a link to what we need to review.
