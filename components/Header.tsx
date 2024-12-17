"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Badge, IconButton, Switch, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useAppSelector } from "@/hooks/hooks";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}
export default function Header({ darkMode, handleThemeChange }: Props) {
  const router = useRouter();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/store" },
    { title: "Contact", path: "/contact" },
  ];

  const accountLinks = [
    { title: "Login", path: "/login" },
    { title: "Register", path: "/register" },
  ];

  const {basket} = useAppSelector(state=>state.basket);
    console.log('Basket: ', basket);
    useEffect(()=>{
        console.log('Basket Items:', basket?.items);
    }, [basket]);
    const itemCount = basket?.items?.reduce((sum, item)=>sum+item.quantity, 0) || 0;

  return (
    <header className="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-md mb-25">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <Typography
            variant="h6"
            className="text-xl font-semibold text-gray-900 dark:text-white"
          >
            Sports Center
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </div>

        <nav className="flex space-x-6">
          {navLinks.map(({ title, path }) => (
            <button
              key={path}
              onClick={() => router.push(path)}
              className="text-gray-800 dark:text-gray-200 hover:text-gray-500 transition"
            >
              {title}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <IconButton
            onClick={() => router.push("/basket")}
            size="large"
            color="inherit"
          >
            <Badge badgeContent={itemCount} color="secondary">
                <Link href="/basket">
                    <ShoppingCart />
                </Link>
            </Badge>
          </IconButton>

          <nav className="flex space-x-4">
            {accountLinks.map(({ title, path }) => (
              <button
                key={path}
                onClick={() => router.push(path)}
                className="text-gray-800 dark:text-gray-200 hover:text-gray-500 transition"
              >
                {title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
