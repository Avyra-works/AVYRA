import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeadModal from '../components/LeadModal';

export const MainLayout = ({ children }) => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const openLeadModal = () => {
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-accent-gold/20 flex flex-col">
      <Header onOpenLeadModal={openLeadModal} />
      <main className="flex-grow">
        {React.cloneElement(children, { onOpenLeadModal: openLeadModal })}
      </main>
      <Footer />
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
    </div>
  );
};

export default MainLayout;
