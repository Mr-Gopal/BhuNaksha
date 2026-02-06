"use server";

import { flagParcelMismatches } from "@/ai/flows/flag-parcel-mismatches";

type FormState = {
  mismatches: string | null;
  error: string | null;
};

export async function runMismatchDetection(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parcelData = formData.get("parcelData") as string;

  if (!parcelData) {
    return { mismatches: null, error: "Parcel data is missing." };
  }

  try {
    const result = await flagParcelMismatches({ parcelData });
    return { mismatches: result.mismatches, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { mismatches: null, error: `Failed to run mismatch detection: ${errorMessage}` };
  }
}
