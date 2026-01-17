'use server';

/**
 * @fileOverview AI-powered construction material estimation.
 *
 * This file defines a Genkit flow that accepts project details and
 * returns an estimated list of construction materials.
 *
 * @fileOverview
 * - estimateMaterials - Function to estimate materials for a given project.
 * - MaterialEstimationInput - The input type for the estimateMaterials function.
 * - MaterialEstimationOutput - The return type for the estimateMaterials function.
 */

import { ai } from '@/ai/genkit';
import {
    MaterialEstimationInputSchema,
    type MaterialEstimationInput,
    MaterialEstimationOutputSchema,
    type MaterialEstimationOutput,
} from './material-estimation.types';


export async function estimateMaterials(input: MaterialEstimationInput): Promise<MaterialEstimationOutput> {
  return materialEstimationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'materialEstimationPrompt',
  input: { schema: MaterialEstimationInputSchema },
  output: { schema: MaterialEstimationOutputSchema },
  prompt: `You are an AI assistant for TheBricksAi.in, specializing in construction material estimation.
  Based on standard construction practices in India, provide an approximate estimation of the key materials required for a residential building with the following specifications:

  - Total Built-up Area: {{{builtUpArea}}} sq. ft.
  - Number of Floors: {{{floors}}}

  Your output must be a list of materials with their quantities (e.g., "Cement", "800 bags").
  The materials to estimate should include at a minimum: Cement, Steel, Bricks, Sand, and Aggregate.

  You must also provide a brief explanation and a disclaimer that these are preliminary estimates and a professional should be consulted for accurate costing.
  For example: "These quantities are approximate and for preliminary planning only. Consult a professional for accurate project costing."
  `,
});

const materialEstimationFlow = ai.defineFlow(
  {
    name: 'materialEstimationFlow',
    inputSchema: MaterialEstimationInputSchema,
    outputSchema: MaterialEstimationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
