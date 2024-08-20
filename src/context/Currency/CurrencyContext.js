import React, { createContext, useState } from "react";

// Create a context for currency
export const CurrencyContext = createContext({});

// Currency provider component
export const CurrencyContextProvider = ({ children }) => {
  const [selectedCurr, setSelectedCurr] = useState({
    currency: "GBP",
    symbol: "£",
    value: 1,
  });

  const currencyContext = {
    selectedCurr,
    setSelectedCurr,
  };

  return (
    <CurrencyContext.Provider value={currencyContext}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
