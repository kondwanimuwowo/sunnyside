import React, { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memoize functions to prevent unnecessary re-renders
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  const showLoading = useCallback(() => setLoading(true), []);
  const hideLoading = useCallback(() => setLoading(false), []);

  const value = {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    modalOpen,
    modalContent,
    openModal,
    closeModal,
    loading,
    showLoading,
    hideLoading,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
