import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utilities/constants';
import { IQuote } from '../utilities/interfaces';

function NewlinedParagraph({ children }: { children: string }) {
  return children.includes('\n') ? (
    <>
      {React.Children.toArray(
        children
          .split('\n')
          .map(subString => <p className="text-sm max-w-md">{subString}</p>)
      )}
    </>
  ) : (
    <p className="text-sm max-w-md">{children}</p>
  );
}

export default function Quote() {
  const [quote, setQuote] = useState<IQuote | undefined>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quotes`);
        setQuote(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getQuote();
  }, []);

  if (error) {
    return <div>Failed to load</div>;
  } else if (!quote) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex flex-col items-center mx-4 mb-6 mt-[76px] italic">
        <NewlinedParagraph>{`“${quote.quoteText}”`}</NewlinedParagraph>
        <p className="text-sm not-italic">{` - ${quote.philosopher}`}</p>
      </div>
    );
  }
}
