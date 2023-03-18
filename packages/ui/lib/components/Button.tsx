import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => (
  <button onClick={() => props.onClick()}>{props.children}</button>
);

export default Button;
