"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { runMismatchDetection } from "@/app/actions";
import type { Parcel } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type MismatchDetectorProps = {
  parcel: Parcel;
};

const initialState = {
  mismatches: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Detect Mismatches
    </Button>
  );
}

export default function MismatchDetector({ parcel }: MismatchDetectorProps) {
  const [state, formAction] = useActionState(runMismatchDetection, initialState);

  const parcelDataString = JSON.stringify(
    {
      owner: parcel.owner,
      phoneNumber: parcel.phoneNumber,
      surveyNumber: parcel.surveyNumber,
      area: parcel.area,
    },
    null,
    2
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Mismatch Detector</CardTitle>
        <CardDescription>
          Use AI to analyze parcel data and flag potential discrepancies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="parcelData" value={parcelDataString} />
          <SubmitButton />
        </form>

        {state.mismatches && (
           <Alert className="mt-4">
             <Lightbulb className="h-4 w-4" />
            <AlertTitle>AI Analysis Complete</AlertTitle>
            <AlertDescription>
              {state.mismatches}
            </AlertDescription>
          </Alert>
        )}

        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {state.error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
