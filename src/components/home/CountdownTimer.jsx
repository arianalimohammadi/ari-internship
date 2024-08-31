import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryDate }) => {
  const calculateCountdown = (expiryDate) => {
    const now = new Date().getTime();
    const end = parseInt(expiryDate, 10);

    if (isNaN(end)) {
      return "Invalid Date";
    }

    const timeRemaining = end - now;

    if (timeRemaining <= 0) return "Expired";
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const [countdown, setCountdown] = useState(calculateCountdown(expiryDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateCountdown(expiryDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  return <div>{countdown}</div>;
};

export default CountdownTimer;
