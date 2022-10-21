import React, { useEffect, useState } from 'react';
import getRandomColor from '../utilities/getRandomColor';

export default function Input({
  type,
  name,
  placeholder,
  required = false,
  handleChange,
}: {
  type: string,
  name: string,
  placeholder: string,
  required: boolean,
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  ) => void,
}) {
  const [inputValue, setInputValue] = useState('');

  // NOTE If user does not change the color, the displayed random one will not be posted
  useEffect(() => {
    if (type === 'color') setInputValue(getRandomColor());
  },[]);

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={inputValue}
      onChange={e => handleChange(e, setInputValue)}
      required={required}
      className="mt-1 block w-full px-2 py-1 bg-white border border-slate-300 rounded-sm text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
    />
  );
}
