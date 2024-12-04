import { ReactNode, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'success' | 'warning';

interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
    const baseStyles = 'w-24 h-20 rounded-lg cursor-pointer select-none transition-all duration-150 font-bold text-sm';
    
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-blue-500 text-white [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] active:translate-y-2 active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]',
      success: 'bg-green-500 text-white [box-shadow:0_10px_0_0_#15803d,0_15px_0_0_#15803d41] active:translate-y-2 active:[box-shadow:0_0px_0_0_#15803d,0_0px_0_0_#15803d41]',
      warning: 'bg-yellow-500 text-white [box-shadow:0_10px_0_0_#854d0e,0_15px_0_0_#854d0e41] active:translate-y-2 active:[box-shadow:0_0px_0_0_#854d0e,0_0px_0_0_#854d0e41]'
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
        <span className="flex flex-col justify-center items-center h-full">{children}</span>
      </button>
    );
  };
  
  export default Button;