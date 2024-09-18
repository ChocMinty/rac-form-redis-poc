"use client";

import Layout from "../layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Step2FormData } from "@/types/formData";

export default function Step2() {
  const [formData, setFormData] = useState<Step2FormData>({
    address: "",
    city: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getData?step=2");
        const data = await response.json();

        if (data.error) {
          console.log("Error getting cache data:", data.error);
        } else {
          setFormData(data.formData as Step2FormData);
        }
      } catch (error) {
        setError("Failed to load data for step 2");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/saveData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: 2, formData }),
    });

    router.push("/summary");
  };

  return (
    <Layout>
      <div>
        {error && <p>{error}</p>}
        {!error && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <button type="submit">Next</button>
          </form>
        )}
      </div>
    </Layout>
  );
}
