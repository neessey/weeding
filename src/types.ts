export interface VenueInfo {
  id: 'civile' | 'nuptiale' | 'reception';
  title: string;
  subtitle: string;
  time: string;
  location: string;
  subLocation?: string;
  address: string;
  mapsQuery: string;
  directionsUrl: string;
  details: string;
}

export interface GuestRsvp {
  id: string;
  side: 'mr' | 'mme';
  fullName: string;
  phone: string;
  guestsCount: number;
  attending: boolean;
  notes?: string;
  tableNumber?: string;
  code: string;
  createdAt: string;
}
