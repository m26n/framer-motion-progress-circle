import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./index.css";

export default function App() {
  const [name, setName] = React.useState<string>("X".repeat(20));
  // const [percentage, setPercentage] = React.useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const max_length = 25;
  const percentage = Math.min(101, (name.length / max_length) * 100);
  const is_too_much = percentage > 100;
  const color = is_too_much ? `rgb(255,18,18)` : `rgb(24,127,0)`;

  const usage_message = `${name.length} / ${max_length} characters used`;

  return (
    <div>
      {/* <input
        type="range"
        min="0"
        max="100"
        className="w-screen"
        value={percentage}
        onChange={(e) => setPercentage(Number(e.currentTarget.value))}
      /> */}
      <h1 className="text-3xl">Progress bar</h1>
      <p>Input value: {name} </p>
      <p>Input value length: {name.length}</p>
      <p>Max value length: {max_length}</p>
      <p>percentage: {percentage}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        className="border-2"
      />
      <hr className="my-10" />
      <div
        className={`ml-8 py-2 px-4 inline-flex items-center justify-between border-2 ${
          is_too_much ? "border-red-500" : "border-green-500"
        }`}
      >
        <motion.span
          className={`rounded-full w-8 aspect-square border-2 ${
            is_too_much ? "border-red-500" : "border-green-500"
          }`}
          style={
            {
              "--pct": `${percentage}%`,
              "--pct-color": `${color}`,
              background: `conic-gradient(
                from 0deg at 50% 50%,
                var(--pct-color) 0%,
                var(--pct-color) var(--pct),
                rgb(255, 255, 255, 0) var(--pct),
                rgb(255, 255, 255, 0) 100%
              )`
            } as React.CSSProperties
          }
          animate={
            shouldReduceMotion
              ? {}
              : [
                  { "--pct": `${percentage}%` } as any,
                  { "--pct-color": `${color}` } as any
                ]
          }
          transition={
            shouldReduceMotion
              ? {}
              : {
                  "--pct": { duration: 0.4, delay: 0 },
                  "--pct-color": { duration: 0.5, delay: 0 }
                }
          }
        ></motion.span>
        <div className="relative">
          <span className="invisible font-mono text-sm">{usage_message}</span>

          <span
            className={`absolute right-0 font-semibold ${
              is_too_much ? "text-red-500" : "text-green-500"
            }`}
          >
            {usage_message}
          </span>
        </div>
      </div>
    </div>
  );
}
