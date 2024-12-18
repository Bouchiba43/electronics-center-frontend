import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  GitHub 
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <Facebook />, 
      href: "https://www.facebook.com/ahmedbouchiba43", 
      label: "Facebook" 
    },
    { 
      icon: <Instagram />, 
      href: "https://www.instagram.com/ahmed_bouchiba43/profilecard/", 
      label: "Instagram" 
    },
    { 
      icon: <Twitter />, 
      href: "https://x.com/AhmedBouchiba43?t=hpW2jZTPliXelWJvf_D0xQ&s=09", 
      label: "Twitter" 
    },
    { 
      icon: <GitHub />, 
      href: "https://github.com/Bouchiba43", 
      label: "GitHub" 
    }
  ];

  const footerLinks = [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Team", href: "/team" },
    { title: "Pricing", href: "/pricing" },
    { title: "Contact", href: "/contact" },
    { title: "Terms", href: "/terms" }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Electronics Store
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering athletes and sports enthusiasts with top-quality gear and expertise.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <motion.div
                  key={link.title}
                  whileHover={{ translateX: 5 }}
                  className="transition-transform"
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h3>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Softech Carthage, Inventors Of Freelanso , All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;