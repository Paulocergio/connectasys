"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../login/ThemeToggle";
import { LoginIllustration } from "../login/LoginIllustration";

import { LoginForm } from "../login/LoginForm";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleLogin = (email: string, password: string) => {
    // Login logic
    if (email === "teste@teste.com.br" && password === "123456") {
      setSuccess("Login realizado com sucesso!");
      setError("");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      setError("E-mail ou senha inválidos!");
      setSuccess("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex flex-1 flex-col lg:flex-row w-full overflow-hidden">
        <LoginIllustration />
        <LoginForm 
          onSubmit={handleLogin} 
          error={error} 
          success={success}
        />
      </div>
    </div>
  );
}