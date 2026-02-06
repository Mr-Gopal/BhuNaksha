'use server';

/**
 * @fileOverview This file defines a Genkit flow to automatically evaluate and flag potential data discrepancies in land parcels.
 *
 * - flagParcelMismatches - A function that triggers the parcel mismatch detection flow.
 * - FlagParcelMismatchesInput - The input type for the flagParcelMismatches function.
 * - FlagParcelMismatchesOutput - The return type for the flagParcelMismatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagParcelMismatchesInputSchema = z.object({
  parcelData: z.string().describe('A string containing all land parcel data.'),
});
export type FlagParcelMismatchesInput = z.infer<typeof FlagParcelMismatchesInputSchema>;

const FlagParcelMismatchesOutputSchema = z.object({
  mismatches: z.string().describe('A description of data discrepancies in land parcels.'),
});
export type FlagParcelMismatchesOutput = z.infer<typeof FlagParcelMismatchesOutputSchema>;

export async function flagParcelMismatches(input: FlagParcelMismatchesInput): Promise<FlagParcelMismatchesOutput> {
  return flagParcelMismatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagParcelMismatchesPrompt',
  input: {schema: FlagParcelMismatchesInputSchema},
  output: {schema: FlagParcelMismatchesOutputSchema},
  prompt: `You are an expert system for detecting data discrepancies in land parcels.

You will receive land parcel data as a string and you should identify any potential mismatches or inaccuracies.

Return a description of the identified data discrepancies. 

Land Parcel Data: {{{parcelData}}}`,
});

const flagParcelMismatchesFlow = ai.defineFlow(
  {
    name: 'flagParcelMismatchesFlow',
    inputSchema: FlagParcelMismatchesInputSchema,
    outputSchema: FlagParcelMismatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
