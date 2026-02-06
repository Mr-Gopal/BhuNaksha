"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';

const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />,
});

export default MapComponent;
