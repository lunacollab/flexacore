import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface FCProviderProps {
  children: ReactNode;
}

const FCThemeContext = createContext({
  theme: 'default',
  setTheme: (theme: string) => {}
});

export const useFCTheme = () => useContext(FCThemeContext);

const FCProvider: React.FC<FCProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('default');
  return (
    <FCThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </FCThemeContext.Provider>
  );
};

export default FCProvider; 