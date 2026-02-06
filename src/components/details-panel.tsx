"use client";

import type { Parcel } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Phone, ScanLine, Milestone, Trophy, Medal, Star } from "lucide-react";
import MismatchDetector from "./mismatch-detector";

type DetailsPanelProps = {
  parcel: Parcel | null;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'matched': return 'default';
    case 'minorMismatch': return 'secondary';
    case 'majorDiscrepancy': return 'destructive';
    case 'corrected': return 'outline';
    default: return 'default';
  }
};

const LeaderboardItem = ({ rank, name, points, icon: Icon, color }: { rank: number; name: string; points: number; icon: React.ElementType, color: string }) => (
  <div className="flex items-center gap-4 p-2 rounded-lg transition-colors hover:bg-muted/50">
    <div className="flex items-center gap-3">
      <span className="text-lg font-bold w-6 text-center">{rank}</span>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <div className="flex-1">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{points} Points</p>
    </div>
  </div>
);

export default function DetailsPanel({ parcel }: DetailsPanelProps) {
  if (!parcel) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-card">
        <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">No Parcel Selected</h3>
        <p className="text-muted-foreground">Click a parcel on the map to view its details.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold">{parcel.owner}</h2>
        <p className="text-muted-foreground">Parcel ID: {parcel.id}</p>
      </div>
      <Tabs defaultValue="details" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="m-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="corrections">Corrections</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="flex-1 overflow-y-auto px-4">
          <div className="space-y-4">
             <Card>
              <CardHeader>
                <CardTitle className="text-lg">Parcel Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{parcel.owner}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{parcel.phoneNumber}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <ScanLine className="w-4 h-4 text-muted-foreground" />
                  <span>Survey No: {parcel.surveyNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Milestone className="w-4 h-4 text-muted-foreground" />
                  <span>Area: {parcel.area} sq. m.</span>
                </div>
                 <div className="flex items-center gap-3">
                  <span className="font-semibold">Status:</span>
                  <Badge variant={getStatusVariant(parcel.status)} className="capitalize">{parcel.status.replace('Mismatch', ' Mismatch')}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="corrections" className="flex-1 overflow-y-auto px-4">
          <MismatchDetector parcel={parcel} />
        </TabsContent>
        <TabsContent value="leaderboard" className="flex-1 overflow-y-auto px-4">
           <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Correctors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <LeaderboardItem rank={1} name="Ravi Kumar" points={1250} icon={Trophy} color="text-yellow-400" />
                <LeaderboardItem rank={2} name="Sunita Devi" points={1100} icon={Medal} color="text-slate-400" />
                <LeaderboardItem rank={3} name="Amit Patel" points={950} icon={Star} color="text-yellow-600" />
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
