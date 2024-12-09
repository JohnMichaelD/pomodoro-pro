import { ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'success' | 'warning';

interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
    const baseStyles = 'w-40 h-8 rounded-full cursor-pointer select-none transition-all duration-150 font-bold text-sm';
    
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-white text-black border border-black',
      success: 'bg-black text-white',
      warning: 'bg-red-900 text-white'
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        <span className="flex flex-col justify-center items-center h-full">{children}</span>
      </button>
    );
  };
  
  export default Button;