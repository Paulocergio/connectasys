import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AlertMessage } from "./AlertMessage";
import { userService } from "../../lib/services/userService"; // Make sure this path is correct

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
  success: string;
}

export function LoginForm({ onSubmit, error, success }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [localSuccess, setLocalSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add this state

  // Add the togglePasswordVisibility function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!email || !password) {
      setLocalError('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    setLocalError('');
    setLocalSuccess('');
  
    try {
      const response = await userService.login({ email, password });
      
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setLocalSuccess('Login realizado com sucesso!');
        
        // Redireciona após um pequeno delay para mostrar a mensagem
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        throw new Error('Resposta de login inválida');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao realizar login';
      setLocalError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-0">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl transition-all duration-300 dark:shadow-indigo-900/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Bem-vindo ao ConnectaSys
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Faça login na sua conta e comece a aventura
            </p>
          </div>

          <AnimatePresence>
            {(error || localError) && (
              <AlertMessage type="error" message={error || localError} />
            )}
            {(success || localSuccess) && (
              <AlertMessage type="success" message={success || localSuccess} />
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors duration-200" size={18} />
                <input
                  type="email"
                  className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors duration-200" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-700 dark:text-gray-300">
                  Lembrar-me
                </label>
              </div>
              <div>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium p-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Entrar <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Não tem uma conta?{" "}
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Registre-se agora
              </a>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}