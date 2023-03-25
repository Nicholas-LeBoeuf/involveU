export interface Events {
  eventID?: number;
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  dateTimeFormatted: string;
  description: string;
  isTransportation: number;
  ticketLink?: string;
  clubName?: string;
  numOfRsvps?: number;

  //derived
  clubID: number;
  clubLogo: any;
}
