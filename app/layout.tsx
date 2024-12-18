"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import StoreProvider from "@/app/StoreProvider";
import AppInitializer from "@/components/AppInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";


  
  

  const theme = createTheme({
    palette: {
      mode: paletteType,
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppInitializer />
            <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
            <Container maxWidth="xl" sx={{ padding: "25px" }}>
              {children}
            </Container>
            <Footer />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
