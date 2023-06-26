import { useResponsiveness } from '@inc/ui';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import i18next from 'i18next';
import { useState, MouseEvent, useEffect } from 'react';

const ChangeLanguageButton = () => {
  const [language, setLanguage] = useState<'English' | 'Chinese' | ''>('');

  const [isSm] = useResponsiveness(['sm']);

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

  useEffect(() => {
    // Update the selected language in local storage
    localStorage.setItem('i18nextLng', language === 'English' ? 'en' : 'cn');
    console.log(language);
    // Change the language using i18next
    i18next.changeLanguage(language === 'English' ? 'en' : 'cn');
  }, [language]);

  const toggleLanguageChange = () => {
    if (language === 'English') {
      setLanguage('Chinese');
    } else {
      setLanguage('English');
    }
  };

  const handleLanguageChange = (
    event: MouseEvent<HTMLElement>,
    newLanguage: 'English' | 'Chinese'
  ) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  if (!isSm) {
    return (
      <Button
        onClick={() => {
          toggleLanguageChange();
        }}
        sx={{ color: ({ palette }) => palette.text.primary, fontWeight: 'bold' }}
      >
        {language === 'English' ? 'EN' : '中'}
      </Button>
    );
  }
  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleLanguageChange}>
      <ToggleButton value="English">EN</ToggleButton>
      <ToggleButton value="Chinese">中</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChangeLanguageButton;
