// src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LoginIllustration } from "./LoginIllustration";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="flex flex-1 flex-col lg:flex-row w-full overflow-hidden">
        <LoginIllustration />
        <LoginForm
          onSubmit={() => {}} // No longer needed as the form handles submission internally
          error={error}
          success={success}
        />
      </div>
    </div>
  );
}