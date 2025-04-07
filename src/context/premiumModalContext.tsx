import PremiumModal, { PremiumModalRef } from '@/components/PremiumModal';
import React, { createContext, useContext, useRef } from 'react';

interface PremiumModalContextType {
  openPremiumModal: () => void;
}

const PremiumModalContext = createContext<PremiumModalContextType | undefined>(
  undefined,
);

export const PremiumModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const modalRef = useRef<PremiumModalRef>(null);

  const openPremiumModal = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };

  return (
    <PremiumModalContext.Provider value={{ openPremiumModal }}>
      {children}
      <PremiumModal ref={modalRef} />
    </PremiumModalContext.Provider>
  );
};

export const usePremiumModal = () => {
  const context = useContext(PremiumModalContext);
  if (!context) {
    throw new Error(
      'usePremiumModal must be used within a PremiumModalProvider',
    );
  }
  return context;
};
