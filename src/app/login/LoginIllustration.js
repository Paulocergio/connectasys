import { motion } from "framer-motion";

export function LoginIllustration() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="flex flex-col justify-center items-center p-12 text-white z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg text-center"
        >
          <h1 className="text-4xl font-bold mb-6">ConnectaSys</h1>
          <p className="text-xl mb-8 text-indigo-100">Transformando experiências digitais com soluções inteligentes</p>
        </motion.div>
        <motion.img
          src="/v2-login-light.png"
          alt="Login UI"
          className="max-w-md mt-8 shadow-2xl rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      {/* Círculos decorativos */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-500 opacity-20"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-500 opacity-20"></div>
    </div>
  );
}