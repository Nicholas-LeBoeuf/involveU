export interface Events {
  eventID?: number;
  eventName: string;
  eventLocation: string;
  startTime: string;
  endTime: string;
  eventDate: string;
  eventDesc: string;
  isTransportation: number;
  ticketLink?: string;
  clubName?: string;
  //derived
  clubID: number;
}
