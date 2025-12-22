import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { ROUTES, CONTACT, APP_NAME } from "@utils/constants";
import logo from "/sunnyside-bw-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: ROUTES.HOME, label: "Home" },
    { path: ROUTES.SERVICES, label: "Services" },
    { path: ROUTES.ABOUT, label: "About Us" },
    { path: ROUTES.GALLERY, label: "Gallery" },
    { path: ROUTES.CONTACT, label: "Contact" },
  ];

  const supportLinks = [
    { path: ROUTES.DONATE, label: "Donate" },
    { path: ROUTES.BLOG, label: "Blog" },
    { path: ROUTES.PRIVACY, label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Sunnyside Logo" className="w-28" />
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              Empowering children with learning challenges in Zambia. We provide
              specialized support for children with autism, Down syndrome,
              cerebral palsy, and other developmental challenges.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={CONTACT.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#32cd32] rounded-full flex items-center justify-center transition-colors duration-150"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Support - Side by side on mobile */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-[#32cd32] transition-colors duration-150 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-[#32cd32] transition-colors duration-150 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#32cd32] flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-400">
                  {CONTACT.PHONE_1} / {CONTACT.PHONE_2}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-[#32cd32] flex-shrink-0 mt-1" />
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="text-gray-400 hover:text-[#32cd32] transition-colors"
              >
                {CONTACT.EMAIL}
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#32cd32] flex-shrink-0 mt-1" />
              <p className="text-gray-400">{CONTACT.ADDRESS}</p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <p className="text-center text-gray-300 italic">
            "Making sure all children with learning challenges are accepted and
            treated fairly in mainstream schools across Zambia"
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Every child <span className="text-[#32cd32]">Learns</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
