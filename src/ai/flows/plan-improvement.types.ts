// src/ai/flows/plan-improvement.types.ts
import {z} from 'genkit';

export const PlanImprovementInputSchema = z.object({
  propertyId: z.string().describe('The ID of the property to which the plan is attached.'),
  originalPlanDataUri: z
    .string()
    .describe(
      "The original house plan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PlanImprovementInput = z.infer<typeof PlanImprovementInputSchema>;

export const PlanImprovementOutputSchema = z.object({
  improvedPlanDataUri: z
    .string()
    .describe(
      "The AI-improved house plan, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  explanation: z.string().describe('An explanation of the changes made to the plan.'),
});
export type PlanImprovementOutput = z.infer<typeof PlanImprovementOutputSchema>;
