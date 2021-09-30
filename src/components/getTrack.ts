import axios from 'axios';
const client = axios.create({
  baseURL: 'https://apis.tracker.delivery/',
});


export default function getTrack(CompanyID: string, trackID: string) {

  return client.get(`/carriers/${CompanyID}/tracks/${trackID}`);
}
