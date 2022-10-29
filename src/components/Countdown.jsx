import { useEffect, useState } from "react";

export default function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [intervalVar, setIntervalVar] = useState();

  useEffect(() => {
    calcTime();

    const intervalVar = setInterval(() => {
      calcTime();
    }, 1000);

    setIntervalVar(intervalVar);

    return () => clearInterval(intervalVar);
  }, []);

  function calcTime() {
    const msLeft = expiryDate - Date.now();

    if (msLeft < 0) {
      clearInterval(intervalVar);
      setTimeLeft("EXPIRED");
      return;
    }

    const secLeft = msLeft / 1000;
    const minLeft = secLeft / 60;
    const hrLeft = minLeft / 60;

    setTimeLeft(
      `${Math.trunc(hrLeft)}h ${Math.trunc(minLeft % 60)}m ${Math.trunc(
        secLeft % 60
      )}s`
    );
  }

  return <div className="de_countdown">{timeLeft}</div>;
}
