import { ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'success' | 'warning';

interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
    const baseStyles = 'w-40 h-8 rounded-lg cursor-pointer select-none transition-all duration-150 font-bold text-sm';
    
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-blue-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white'
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        <span className="flex flex-col justify-center items-center h-full">{children}</span>
      </button>
    );
  };
  
  export default Button;