import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Brightness4, Brightness7 } from "@mui/icons-material";
import Link from "next/link";
import { useAppSelector } from "@/hooks/hooks";
import SignedInMenu from "@/components/auth/SignedInMenu";

interface HeaderProps {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, handleThemeChange }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account); // Get user from the Redux store
  const itemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/store" },
    { title: "Contact", path: "/contact" },
  ];

  const accountLinks = [
    { title: "SignIn", path: "/auth/login" },
    { title: "SignUp", path: "/auth/signup" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavigationLink: React.FC<{
    title: string;
    path: string;
    mobile?: boolean;
  }> = ({ title, path, mobile = false }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${
        mobile
          ? "w-full text-center py-3 border-b dark:border-gray-700"
          : "px-3 py-2"
      } text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300`}
    >
      <button
        onClick={() => {
          router.push(path);
          setIsMenuOpen(false);
        }}
        className="w-full text-left"
      >
        {title}
      </button>
    </motion.div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-md"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          {/* Logo */}
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sports Center
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="-mr-2 -my-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? "✕" : "☰"}
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavigationLink key={link.path} {...link} />
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ rotate: 360 }}
              onClick={handleThemeChange}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </motion.button>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/basket" className="relative">
                <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <ShoppingCart />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Account */}
            <div className="flex space-x-4">
              {user ? (
                <SignedInMenu /> // Show SignedInMenu if user is logged in
              ) : (
                accountLinks.map((link) => (
                  <NavigationLink key={link.path} {...link} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
