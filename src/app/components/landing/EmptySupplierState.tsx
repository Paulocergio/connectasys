import React from 'react';
import { SearchX, Plus, RefreshCw } from 'lucide-react';

type EmptyStateProps = {
  // Propriedades principais
  title: string;
  description: string;
  
  // Personalização visual
  icon?: React.ReactNode;
  imageUrl?: string;
  
  // Ação principal (opcional)
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  
  // Ação secundária (opcional)
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  secondaryActionIcon?: React.ReactNode;
  
  // Estilos e configuração
  variant?: 'default' | 'search' | 'create' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  // Valores padrão para propriedades opcionais
  title,
  description,
  icon,
  imageUrl,
  actionLabel,
  onAction,
  actionIcon,
  secondaryActionLabel,
  onSecondaryAction,
  secondaryActionIcon,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  // Determinar o ícone padrão com base na variante
  const getDefaultIcon = () => {
    switch (variant) {
      case 'search':
        return <SearchX />;
      case 'create':
        return <Plus />;
      case 'error':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  // Determinar cores com base na variante
  const getColors = () => {
    switch (variant) {
      case 'search':
        return {
          icon: 'text-blue-500',
          iconBg: 'bg-blue-50',
          button: 'bg-blue-600 hover:bg-blue-700',
          secondaryButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        };
      case 'create':
        return {
          icon: 'text-green-500',
          iconBg: 'bg-green-50',
          button: 'bg-green-600 hover:bg-green-700',
          secondaryButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        };
      case 'error':
        return {
          icon: 'text-red-500',
          iconBg: 'bg-red-50',
          button: 'bg-red-600 hover:bg-red-700',
          secondaryButton: 'bg-gray-100 text-red-700 hover:bg-gray-200'
        };
      default:
        return {
          icon: 'text-gray-500',
          iconBg: 'bg-gray-50',
          button: 'bg-blue-600 hover:bg-blue-700',
          secondaryButton: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        };
    }
  };

  // Determinar tamanhos com base na propriedade size
  const getSizes = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'py-6 px-4',
          icon: 'h-10 w-10',
          iconContainer: 'p-3',
          title: 'text-lg',
          description: 'text-sm',
          button: 'px-3 py-1.5 text-sm',
        };
      case 'lg':
        return {
          container: 'py-20 px-8',
          icon: 'h-20 w-20',
          iconContainer: 'p-8',
          title: 'text-3xl',
          description: 'text-xl',
          button: 'px-8 py-4 text-lg',
        };
      default: // md
        return {
          container: 'py-16 px-6',
          icon: 'h-16 w-16',
          iconContainer: 'p-6',
          title: 'text-2xl',
          description: 'text-base',
          button: 'px-6 py-3',
        };
    }
  };

  const colors = getColors();
  const sizes = getSizes();
  const displayIcon = icon || getDefaultIcon();

  return (
    <div className={`flex flex-col items-center justify-center ${sizes.container} ${className}`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Empty state illustration" className="mb-6 max-w-xs" />
      ) : (
        <div className={`${colors.iconBg} rounded-full ${sizes.iconContainer} mb-6`}>
          <div className={`${colors.icon} ${sizes.icon}`}>
            {displayIcon}
          </div>
        </div>
      )}
      
      <h2 className={`${sizes.title} font-bold text-gray-800 mb-2`}>{title}</h2>
      
      <p className={`${sizes.description} text-gray-600 text-center mb-6 max-w-md`}>
        {description}
      </p>
      
      <div className="flex flex-wrap justify-center gap-3">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className={`flex items-center gap-2 ${colors.button} text-white ${sizes.button} rounded-lg transition-colors`}
          >
            {actionIcon && <span>{actionIcon}</span>}
            {actionLabel}
          </button>
        )}
        
        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className={`flex items-center gap-2 ${colors.secondaryButton} border ${sizes.button} rounded-lg transition-colors`}
          >
            {secondaryActionIcon && <span>{secondaryActionIcon}</span>}
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;