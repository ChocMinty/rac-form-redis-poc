'use client';

import Layout from "../layout";
import { useEffect, useState } from "react";
import type { Step1FormData, Step2FormData } from "@/types/formData";

interface AllFormData {
  step1?: Step1FormData;
  step2?: Step2FormData;
}

export default function Summary() {
  const [formData, setFormData] = useState<AllFormData>({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setFormData(data);
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
            {formData.step1 ? (
              <>
                <p>
                  <strong>Name:</strong> {formData.step1.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.step1.email}
                </p>
              </>
            ) : (
              <p>No data for Step 1</p>
            )}
            <h3>Step 2: Address Details</h3>
            {formData.step2 ? (
              <>
                <p>
                  <strong>Address:</strong> {formData.step2.address}
                </p>
                <p>
                  <strong>City:</strong> {formData.step2.city}
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
