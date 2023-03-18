import React, { ReactNode } from 'react';
type ButtonProps = {
    onClick: () => void;
    children: ReactNode;
};
declare const Button: React.FC<ButtonProps>;
export default Button;
