import { useState, useEffect } from 'react';

const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  return width <= 768;
};

export default useCheckMobileScreen;
