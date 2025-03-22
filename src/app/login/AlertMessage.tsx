import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AlertMessageProps {
  type: 'error' | 'success';
  message: string;
}

export function AlertMessage({ type, message }: AlertMessageProps) {
  if (!message) return null;
  
  const isError = type === 'error';
  const bgColor = isError ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30';
  const borderColor = isError ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-800';
  const textColor = isError ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`mb-4 p-3 ${bgColor} border ${borderColor} ${textColor} rounded-lg text-sm flex items-center`}
    >
      {isError ? <div className="mr-2 flex-shrink-0">⚠️</div> : <CheckCircle className="mr-2 h-4 w-4" />}
      {message}
    </motion.div>
  );
}