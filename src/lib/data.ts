import type { Parcel } from '@/types';

const parcels: Parcel[] = [
  {
    id: 'P001',
    owner: 'Arjun Sharma',
    phoneNumber: '9876543210',
    surveyNumber: 'SN-101',
    area: 1500,
    status: 'matched',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5946, 12.9716],
          [77.6046, 12.9716],
          [77.6046, 12.9616],
          [77.5946, 12.9616],
          [77.5946, 12.9716],
        ],
      ],
    },
  },
  {
    id: 'P002',
    owner: 'Priya Singh',
    phoneNumber: '9876543211',
    surveyNumber: 'SN-102',
    area: 2200,
    status: 'minorMismatch',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.61, 12.98],
          [77.62, 12.98],
          [77.62, 12.97],
          [77.61, 12.97],
          [77.61, 12.98],
        ],
      ],
    },
  },
  {
    id: 'P003',
    owner: 'Rohan Verma',
    phoneNumber: '9876543212',
    surveyNumber: 'SN-103',
    area: 1800,
    status: 'majorDiscrepancy',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.58, 12.95],
          [77.59, 12.955],
          [77.585, 12.945],
          [77.58, 12.95],
        ],
      ],
    },
  },
  {
    id: 'P004',
    owner: 'Anjali Gupta',
    phoneNumber: '9876543213',
    surveyNumber: 'SN-104',
    area: 3000,
    status: 'corrected',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.63, 12.99],
          [77.64, 12.99],
          [77.64, 12.985],
          [77.63, 12.985],
          [77.63, 12.99],
        ],
      ],
    },
  },
    {
    id: 'P005',
    owner: 'Vikram Rathore',
    phoneNumber: '9876543214',
    surveyNumber: 'SN-105',
    area: 4500,
    status: 'matched',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.56, 12.96],
          [77.57, 12.965],
          [77.575, 12.955],
          [77.565, 12.95],
          [77.56, 12.96],
        ],
      ],
    },
  },
];

export async function getParcels(): Promise<Parcel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return parcels;
}
