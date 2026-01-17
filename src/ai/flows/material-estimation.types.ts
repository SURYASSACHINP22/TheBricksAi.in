import { z } from 'zod';

export const MaterialEstimationInputSchema = z.object({
  builtUpArea: z.number().describe('The total built-up area in square feet.'),
  floors: z.number().describe('The number of floors.'),
});
export type MaterialEstimationInput = z.infer<typeof MaterialEstimationInputSchema>;

export const MaterialEstimationOutputSchema = z.object({
  materials: z.array(z.object({
    name: z.string().describe('Name of the material'),
    quantity: z.string().describe('Estimated quantity of the material with units.'),
  })).describe('A list of estimated materials and their quantities.'),
  explanation: z.string().describe('A brief explanation of the estimation and a disclaimer.'),
});
export type MaterialEstimationOutput = z.infer<typeof MaterialEstimationOutputSchema>;
