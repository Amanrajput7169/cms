// components/TawkToChat.tsx

'use client';

import { useEffect } from 'react';

const TawkToChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/66b70eb8146b7af4a438944c/1i4th30ec';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TawkToChat;
