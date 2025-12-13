import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useUI } from "@context/UIContext";
import { useScrollPosition } from "@hooks/useScrollPosition";
import { ROUTES } from "@utils/constants";
import Button from "@components/common/Button";
import logo from "/sunnyside-logo.png";

const Navbar = () => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUI();
  const { scrollPosition } = useScrollPosition();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 20);
  }, [scrollPosition]);

  // Close menu on route change - with proper dependency
  useEffect(() => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  }, [location.pathname]); // Only depend on pathname, not closeMobileMenu

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: ROUTES.HOME, label: "Home" },
    { path: ROUTES.SERVICES, label: "Services" },
    { path: ROUTES.ABOUT, label: "About" },
    { path: ROUTES.GALLERY, label: "Gallery" },
    { path: ROUTES.CONTACT, label: "Contact" },
    { path: ROUTES.BLOG, label: "Blog" },
    { path: ROUTES.ENROLLMENT, label: "Enrollment" },
  ];

  const isActive = (path) => {
    if (path === ROUTES.HOME) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center space-x-2 group z-10"
          >
            <img
              src={logo}
              alt="Sunnyside Logo"
              className="w-auto h-12 transform group-hover:scale-105 transition-transform"
            />{" "}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(link.path) ? "" : "text-gray-700"
                }`}
                style={{
                  color: isActive(link.path)
                    ? "var(--color-primary)"
                    : undefined,
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                )}
              </Link>
            ))}

            <Link to={ROUTES.DONATE}>
              <Button size="sm">Donate Now</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMobileMenu();
            }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - FIXED */}
      <div
        className={`
          md:hidden 
          bg-white 
          border-t 
          overflow-hidden
          transition-all 
          duration-300 
          ease-in-out
          ${
            mobileMenuOpen
              ? "max-h-screen opacity-100 border-gray-200 shadow-md"
              : "max-h-0 opacity-0 border-transparent"
          }
        `}
        style={{
          borderColor: mobileMenuOpen ? "var(--color-gray-200)" : "transparent",
        }}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-4 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: isActive(link.path)
                  ? "var(--color-primary-alpha)"
                  : "transparent",
                color: isActive(link.path)
                  ? "var(--color-primary)"
                  : "var(--color-gray-700)",
                transitionDelay: mobileMenuOpen ? `${idx * 30}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="pt-2"
            style={{
              transitionDelay: mobileMenuOpen
                ? `${navLinks.length * 30}ms`
                : "0ms",
            }}
          >
            <Link to={ROUTES.DONATE} className="block">
              <Button fullWidth size="sm">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
