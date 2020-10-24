import React, { useEffect, useState } from 'react';

import './real-time-clock.css';

function RealTimeClock() {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
  }, [clock]);
  return (
    <span className="font-weight-bold ml-3 clock-text">Horas: {clock} </span>
  );
}

export default RealTimeClock;
