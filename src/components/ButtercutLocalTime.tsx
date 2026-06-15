"use client";

import { useEffect, useState } from "react";

export function ButtercutLocalTime({ timezone }: { timezone: string }) {
  const [body, setBody] = useState("--:--:--");
  const [period, setPeriod] = useState("--");

  useEffect(() => {
    const update = () => {
      const full = new Date().toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const [time, p] = full.split(" ");
      setBody(time ?? "--:--:--");
      setPeriod(p ?? "--");
    };
    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{body}</span>
      <span
        style={{
          display: "inline-block",
          width: "2.2em",
          textAlign: "left",
          paddingLeft: "0.3em",
        }}
      >
        {period}
      </span>
    </>
  );
}
