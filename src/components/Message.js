import React from 'react';

export const Message = ({ sender, text }) => {
  return (
    <div>
      <strong>{sender}:</strong> {text}
    </div>
  );
};
