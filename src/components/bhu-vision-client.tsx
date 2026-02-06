"use client";

import type { Parcel } from "@/types";
import { useState, useMemo, useEffect } from "react";
import AppHeader from "@/components/header";
import DetailsPanel from "@/components/details-panel";
import MapComponentWrapper from "@/components/map-component-wrapper";

type BhuVisionClientProps = {
  parcels: Parcel[];
};

export default function BhuVisionClient({ parcels: initialParcels }: BhuVisionClientProps) {
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredParcels = useMemo(() => {
    if (!searchQuery) {
      return initialParcels;
    }
    return initialParcels.filter(
      (parcel) =>
        parcel.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        parcel.phoneNumber.includes(searchQuery)
    );
  }, [initialParcels, searchQuery]);

  const selectedParcel = useMemo(() => {
    if (!selectedParcelId) return null;
    return initialParcels.find((p) => p.id === selectedParcelId) ?? null;
  }, [selectedParcelId, initialParcels]);

  const handleParcelSelect = (parcelId: string | null) => {
    setSelectedParcelId(parcelId);
  };
  
  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-background text-foreground">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AppHeader searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
        <div className="flex-1 h-full w-full">
          <MapComponentWrapper
            parcels={filteredParcels}
            selectedParcelId={selectedParcelId}
            onParcelSelect={handleParcelSelect}
          />
        </div>
      </main>
      <aside className="w-full md:w-[400px] md:border-l border-t md:border-t-0 flex-shrink-0 h-1/3 md:h-full overflow-y-auto">
        <DetailsPanel parcel={selectedParcel} />
      </aside>
    </div>
  );
}
