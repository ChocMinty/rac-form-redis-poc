"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Step1FormData } from "@/types/formData";

export default function Step1() {
  const [formData, setFormData] = useState<Step1FormData>({
    name: "",
    email: "",
  });
  const [error] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/getData?step=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Error getting cache data:", data.error);
        } else if (data.formData) {
          setFormData(data.formData as Step1FormData);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/saveData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: 1, formData }),
    });

    router.push("/step2");
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {!error && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <button type="submit">Next</button>
          </div>
        </form>
      )}
    </div>
  );
}
