import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import API_BASE_URL from '../utilities/constants';
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
  const quoteFetcher = (url: string) =>
    axios.get(url).then(response => response.data);
  const { data, error } = useSWR<IQuote>(
    `${API_BASE_URL}/quotes`,
    quoteFetcher
  );

  if (error) {
    return <div>Failed to load</div>;
  } else if (!data) {
    return <div>Loading...</div>;
  } else {
    const quote = `“${data.quoteText}”`;

    return (
      <div className="flex flex-col items-center m-2 italic">
        <NewlinedParagraph>{quote}</NewlinedParagraph>
        <p className="text-sm not-italic">{` - ${data.philosopher}`}</p>
      </div>
    );
  }
}
