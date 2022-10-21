import React from 'react' ;

export default function Form({ title, handleSubmit, children }: {title: string, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, children: React.ReactNode}) {

  return (
    <form className="text-center flex flex-col items-center border rounded-md p-2 text-sm" onSubmit={e => handleSubmit(e)}>
      <h2 className="form__title">{title}</h2>
      {children}
      <button type="submit" className="h-8 w-8 bg-blue-300 border-solid shadow-gray-800 shadow-sm m-1 rounded-full text-gray-800 flex justify-center items-center">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
}
