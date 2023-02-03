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
  spaceName?: string;
  locationName?: string;
  space_ID?: number;
  location_ID?: number;
}
