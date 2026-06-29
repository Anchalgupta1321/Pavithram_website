import React, { useState, useEffect } from 'react';

export default function FormMessage({ status, message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    if (status && message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [status, message]);

  if (!status || !message || !isVisible) return null;

  const isSuccess = status === 'mail_sent' || status === 'success';
  const bgColor = isSuccess ? '#e6f4ea' : '#fce8e6';
  const textColor = isSuccess ? '#1e8e3e' : '#d93025';
  const borderColor = isSuccess ? '#ceead6' : '#fad2cf';

  return (
    <div style={{
      backgroundColor: bgColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
      padding: '12px 16px',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: '500',
      marginBottom: '1rem',
      width: '100%',
      textAlign: 'left'
    }}>
      {message}
    </div>
  );
}
