"use client";

import React, { useState } from "react";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "@/components/Header";
import HomePage from "@/components/Home";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette:{
      mode:paletteType,
    }
  })
  function handleThemeChange(){
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container sx={{ paddingTop: "64px" }}>
          <HomePage />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
