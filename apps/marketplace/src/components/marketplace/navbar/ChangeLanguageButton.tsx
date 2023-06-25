import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import i18next from 'i18next';
import { useState, MouseEvent, useEffect } from 'react';

const ChangeLanguageButton = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese' | ''>('');

  const initializeLanguage = () => {
    const storedLanguage = localStorage.getItem('i18nextLng');

    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
      setLanguage(storedLanguage === 'en' ? 'English' : 'Chinese');
    }
  };

  useEffect(() => {
    initializeLanguage();
  }, []);

  const handleLanguageChange = (
    event: MouseEvent<HTMLElement>,
    newLanguage: 'English' | 'Chinese'
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    } else {
      return;
    }

    // Update the selected language in local storage
    localStorage.setItem('i18nextLng', newLanguage === 'English' ? 'en' : 'cn');
    // console.log(newLanguage);
    // Change the language using i18next
    i18next.changeLanguage(newLanguage === 'English' ? 'en' : 'cn');
  };

  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleLanguageChange}>
      <ToggleButton value="English">EN</ToggleButton>
      <ToggleButton value="Chinese">中</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChangeLanguageButton;
