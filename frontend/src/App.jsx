import React from "react";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Box
        minH={"100vh"}
        bg={useColorModeValue("gray.100", "gray.900")}
        padding={"16px"}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        <Toaster position="bottom-right" />
      </Box>
    </>
  );
};

export default App;
