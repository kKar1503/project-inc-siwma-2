import { useState } from 'react';

const useTogglePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return { showPassword, handleTogglePassword };
};

export default useTogglePasswordVisibility;