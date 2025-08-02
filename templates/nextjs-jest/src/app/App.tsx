import React, { useState, useCallback } from 'react';
import TimerDisplay from './Timer';

function App() {
  const [timerValue, setTimerValue] = useState(0);

  const handleTimerTick = useCallback((newValue: number) => {
    setTimerValue(newValue);
  }, []);

  return (
    <div>
      <p>Parent Timer Value: {timerValue}</p>
      <TimerDisplay onTick={handleTimerTick} />
    </div>
  );
}

export default App;