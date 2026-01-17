// src/ai/flows/plan-improvement.ts
'use server';

/**
 * @fileOverview AI-powered plan improvement flow.
 *
 * This file defines a Genkit flow that accepts a property and a house plan,
 * and returns an AI-improved version of the plan along with an explanation of changes.
 *
 * @fileOverview
 * - planImprovement - Function to improve a given house plan using AI.
 * - PlanImprovementInput - The input type for the planImprovement function.
 * - PlanImprovementOutput - The return type for the planImprovement function.
 */

import {ai} from '@/ai/genkit';
import {
  PlanImprovementInputSchema,
  type PlanImprovementInput,
  PlanImprovementOutputSchema,
  type PlanImprovementOutput,
} from './plan-improvement.types';

export async function planImprovement(input: PlanImprovementInput): Promise<PlanImprovementOutput> {
  return planImprovementFlow(input);
}

const planImprovementPrompt = ai.definePrompt({
  name: 'planImprovementPrompt',
  input: {schema: PlanImprovementInputSchema},
  output: {schema: PlanImprovementOutputSchema},
  prompt: `You are an AI assistant specialized in improving house plans.

You will receive an original house plan and should generate an improved version of the plan, explaining the changes made.

Original Plan: {{media url=originalPlanDataUri}}

Respond with the improved plan and a detailed explanation of the changes. Be sure to include a data URI for the plan, as well as a textual explanation of the changes that were made.`,  
});

const planImprovementFlow = ai.defineFlow(
  {
    name: 'planImprovementFlow',
    inputSchema: PlanImprovementInputSchema,
    outputSchema: PlanImprovementOutputSchema,
  },
  async input => {
    const {output} = await planImprovementPrompt(input);
    return output!;
  }
);
