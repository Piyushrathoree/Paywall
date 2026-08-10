import React from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  year?: number;
  email?: string;
}

const Footer: React.FC<FooterProps> = ({
  year = new Date().getFullYear(),
  email = "support@paywall.com",
}) => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50 py-10 text-slate-400 backdrop-blur-xl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Paywall</h3>
            <p className="text-sm leading-6">
              Simplifying your finances with secure and seamless digital
              payments.
            </p>
            <p className="text-sm">© {year} Paywall. All rights reserved.</p>
          </div>

          <div>
            <h4 className="text-md mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm transition-colors duration-200 hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm transition-colors duration-200 hover:text-cyan-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md mb-4 font-semibold text-white">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://x.com/piyushrathoree"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-300"
              >
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/in/piyushrathore--"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-300"
              >
                <FaLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <div>
              <a
                href={`mailto:support@paywall.com`}
                className="text-sm hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-slate-600">
          <p>Paywall is a registered trademark of Paywall, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
