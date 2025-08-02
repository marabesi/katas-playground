import React, { useState, useEffect } from 'react';

function TimerDisplay({ onTick }: { onTick: (count: number) => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onTick(count + 1);  // Pass updated count to parent
      setCount(prevCount => prevCount + 1); // Update internal state
    }, 1_000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [count, onTick]);

  return <div>Timer: {count}</div>;
}

export default TimerDisplay;