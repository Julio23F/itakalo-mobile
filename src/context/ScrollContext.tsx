import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

interface ScrollContextType {
  isTabVisible: boolean;
  setIsTabVisible: (visible: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  isTabVisible: true,
  setIsTabVisible: () => {},
});

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTabVisible, setIsTabVisible] = useState(true);
  
  const setIsTabVisibleCallback = useCallback((visible: boolean) => {
    setIsTabVisible(visible);
  }, []);

  const value = useMemo(() => ({ isTabVisible, setIsTabVisible: setIsTabVisibleCallback }), [isTabVisible, setIsTabVisibleCallback]);

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);