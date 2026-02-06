"use client";

import { useEffect, useRef } from 'react';
import type { Parcel, ParcelStatus } from '@/types';

type MapComponentProps = {
  parcels: Parcel[];
  selectedParcelId: string | null;
  onParcelSelect: (parcelId: string | null) => void;
};

// Define minimal types for Leaflet to avoid relying on @types/leaflet
type LeafletMap = any;
type LeafletLayer = any;

const getStatusColor = (status: ParcelStatus) => {
  switch (status) {
    case 'matched':
      return '#22c55e'; // green-500
    case 'minorMismatch':
      return '#facc15'; // yellow-400
    case 'majorDiscrepancy':
      return '#ef4444'; // red-500
    case 'corrected':
      return '#3b82f6'; // blue-500
    default:
      return '#6b7280'; // gray-500
  }
};

export default function MapComponent({ parcels, selectedParcelId, onParcelSelect }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const layerGroupRef = useRef<LeafletLayer | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current && (window as any).L) {
      const L = (window as any).L;
      const map = L.map(mapRef.current).setView([12.9716, 77.5946], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      layerGroupRef.current = L.layerGroup().addTo(map);

      map.on('click', () => {
        onParcelSelect(null);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onParcelSelect]);

  useEffect(() => {
    if (mapInstanceRef.current && layerGroupRef.current && (window as any).L) {
      const L = (window as any).L;
      const map = mapInstanceRef.current;
      const layerGroup = layerGroupRef.current;
      
      layerGroup.clearLayers();

      if (parcels.length > 0) {
        parcels.forEach((parcel) => {
          const isSelected = parcel.id === selectedParcelId;
          const polygon = L.polygon(parcel.geometry.coordinates[0].map(coord => [coord[1], coord[0]]), {
            color: getStatusColor(parcel.status),
            weight: isSelected ? 4 : 2,
            opacity: isSelected ? 1 : 0.7,
            fillOpacity: 0.4,
          });

          polygon.bindPopup(`<b>Owner:</b> ${parcel.owner}<br/><b>Survey No:</b> ${parcel.surveyNumber}`);
          
          polygon.on('click', (e: any) => {
            L.DomEvent.stopPropagation(e);
            onParcelSelect(parcel.id);
            map.fitBounds(polygon.getBounds().pad(0.1));
          });
          
          layerGroup.addLayer(polygon);
        });

        if (!selectedParcelId) {
            const allCoords: any[] = parcels.flatMap(p => p.geometry.coordinates[0].map(coord => [coord[1], coord[0]]));
            if (allCoords.length > 0) {
                const bounds = L.latLngBounds(allCoords);
                if (bounds.isValid()) {
                    map.fitBounds(bounds.pad(0.1));
                }
            }
        }
      }
    }
  }, [parcels, selectedParcelId, onParcelSelect]);

  return <div ref={mapRef} className="h-full w-full z-0" />;
}
