export interface Events {
  eventID: number;
  eventName: string;
  eventLocation: string;
  startTime: string;
  endTime: string;
  eventDate: string;
  eventDesc: string;
  isTransportation: boolean;
  ticketLink: string;

  //derived
  clubID: number;
}