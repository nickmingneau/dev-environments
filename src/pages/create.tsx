import React from "react";
import EnvironmentForm from "../components/EnvironmentForm";
import { useRouter } from "next/router";

const CreateEnvironment = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/environments");
  };

  return (
    <div>
      <h1>Create Environment</h1>
      <EnvironmentForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateEnvironment;
