import { useResponsiveness } from '@inc/ui';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import i18next from 'i18next';
import { useState, MouseEvent, useEffect } from 'react';

type SupportedLanguage = 'en' | 'cn';

const ChangeLanguageButton = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  const [isSm] = useResponsiveness(['sm']);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');

    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage);
      console.log(`init with stored language ${storedLanguage}`);
      setLanguage(storedLanguage as SupportedLanguage);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      if (i18next.language !== language) {
        // Update the selected language in local storage
        localStorage.setItem('i18nextLng', language);

        // Change the language using i18next
        i18next.changeLanguage(language);
      }
    }
  }, [language]);

  const toggleLanguageChange = () => {
    if (language === 'en') {
      setLanguage('cn');
    } else {
      setLanguage('en');
    }
  };

  const handleLanguageChange = (event: MouseEvent<HTMLElement>, newLanguage: 'en' | 'cn') => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  if (!isSm) {
    return (
      <Button
        onClick={toggleLanguageChange}
        sx={{ color: ({ palette }) => palette.text.primary, fontWeight: 'bold' }}
      >
        {language === 'en' ? 'EN' : '中'}
      </Button>
    );
  }
  return (
    <ToggleButtonGroup value={language} exclusive onChange={handleLanguageChange}>
      <ToggleButton value="en">EN</ToggleButton>
      <ToggleButton value="cn">中</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ChangeLanguageButton;
