"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionKeyFromCookies = () => {
      const match = document.cookie.match(
        new RegExp("(^| )sessionKey=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    const fetchSessionKey = async () => {
      const existingKey = getSessionKeyFromCookies();

      if (!existingKey) {
        const res = await fetch("/api/createSession");
        const data = await res.json();

        // cookie is being set in the api call... so no need to set it here?
        //document.cookie = `session=${encodeURIComponent(data.sessionKey)}; path=/; httpOnly=true;`;
        console.log("Session key created: ", data.sessionKey);
      } else {
        console.log("Session key already exists");
      }

      setLoading(false);
    };

    fetchSessionKey();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  redirect("/step1");

  return null;
}
