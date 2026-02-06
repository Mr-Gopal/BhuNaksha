export type ParcelStatus = 'matched' | 'minorMismatch' | 'majorDiscrepancy' | 'corrected';

export type Parcel = {
  id: string;
  owner: string;
  phoneNumber: string;
  surveyNumber: string;
  area: number; // in sq meters
  status: ParcelStatus;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
};
