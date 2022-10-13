import axios from 'axios';
import API_URL from './../utilities/constants';

// TODO investigate async return type
export default async function getHabits(startDate: Date, endDate?: Date) {
  // TODO Strongly type response, might be type to import from axios
  let response: any;

  try {
    if (!endDate) {
      response = await axios.get(`${API_URL}/filter?startDate=${startDate.toDateString()}`);
    }
    else
      response = await axios.get(`${API_URL}/filter?startDate=${startDate.toDateString}&endDate=${endDate.toDateString}`);
  // TODO Find out if error should be typed
  } catch (error) {
    console.error("Something went wrong when fetching habit data from the API", error);
  }

  return await response.data;
}