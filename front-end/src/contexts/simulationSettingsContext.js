import { createContext, useState } from 'react';

export const SimulationSettingsContext = createContext();

export const SimulationSettingsProvider = ({ children }) => {
  const [taxaJurosContext, setTaxaJuros] = useState(0);

  const setTaxaJurosContext = (taxa) => setTaxaJuros(taxa);

  const data = { taxaJurosContext, setTaxaJurosContext };
  
  return (
    <SimulationSettingsContext.Provider value={ data }>
      {children}
    </SimulationSettingsContext.Provider>
  );
}
