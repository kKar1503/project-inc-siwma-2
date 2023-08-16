import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

/*
  * This component is used to initialize the language of the app
  * This is not needed if navbar is already present
 */
const I18Fix = ({ children }: { children: React.JSX.Element }) => {

  const [, rerender] = useState(0);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');

    if (storedLanguage) {
      i18next.changeLanguage(storedLanguage).then(() => {
        rerender(1);
      });
      console.log(`init with stored language ${storedLanguage}`);
    }
  }, []);

  return children;
};


export default I18Fix;
