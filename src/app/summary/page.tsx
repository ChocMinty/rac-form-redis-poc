import Layout from "../layout";
import { useEffect, useState } from "react";
import type { Step1FormData, Step2FormData } from "@/types/formData";

export default function Summary() {
  const [step1Data, setStep1Data] = useState<Step1FormData | null>(null);
  const [step2Data, setStep2Data] = useState<Step2FormData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const step1Res = await fetch("/api/getData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 1 }),
        });
        const step1Data = await step1Res.json();
        if (step1Data.error) {
          setError(step1Data.error);
        } else {
          setStep1Data(step1Data.formData as Step1FormData);
        }

        const step2Res = await fetch("/api/getData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 2 }),
        });
        const step2Data = await step2Res.json();
        if (step2Data.error) {
          setError(step2Data.error);
        } else {
          setStep2Data(step2Data.formData as Step2FormData);
        }
      } catch (error) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        {error && <p>{error}</p>}
        {!error && (
          <div>
            <h2>Summary of your information</h2>
            <h3>Step 1: Personal Details</h3>
            {step1Data ? (
              <>
                <p>
                  <strong>Name:</strong> {step1Data.name}
                </p>
                <p>
                  <strong>Email:</strong> {step1Data.email}
                </p>
              </>
            ) : (
              <p>No data for Step 1</p>
            )}
            <h3>Step 2: Address Details</h3>
            {step2Data ? (
              <>
                <p>
                  <strong>Address:</strong> {step2Data.address}
                </p>
                <p>
                  <strong>City:</strong> {step2Data.city}
                </p>
              </>
            ) : (
              <p>No data for Step 2</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
