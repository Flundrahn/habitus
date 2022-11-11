import axios from 'axios';
import useSWR from 'swr';
import API_BASE_URL from '../utilities/constants';
import { IQuote } from '../utilities/interfaces';

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
    return (
      <div className="m-2">
        <p className="text-sm max-w-md">&ldquo;{data.quoteText}&#8221;</p>
        <p className="text-sm">{` - ${data.philosopher}`}</p>
      </div>
    );
  }
}
