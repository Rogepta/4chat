import React from 'react';

export const UserInput = ({ value, onChange, onSend }) => {
  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Введите сообщение'
      />
    </div>
  );
};
