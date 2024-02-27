import React, { createContext, useState } from 'react';

export const CounterContext = createContext();

export function CounterContextProvider(props){ // Corrected export and using children prop
  const [count, setCount] = useState(0)

  return (
    <CounterContext.Provider value={{count}}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContextProvider;