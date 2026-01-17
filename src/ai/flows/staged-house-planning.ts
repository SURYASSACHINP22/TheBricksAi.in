'use server';
/**
 * @fileOverview Staged AI house planning workflow engine.
 * This file implements the strict, user-approval-driven pipeline for generating house plans.
 * The pipeline consists of three sequential stages: Civil, Architectural, and Interior.
 * 
 * - generateCivilConcept - Stage 1: Generates the foundational civil engineering layout.
 * - generateArchitecturalConcept - Stage 2: Generates the architectural design based on an approved civil plan.
 * - generateInteriorConcept - Stage 3: Generates the interior design based on an approved architectural plan.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

//== STAGE 1: CIVIL ENGINEERING CONCEPT =======================================

export const CivilConceptInputSchema = z.object({
  propertyDetails: z.string().describe('Details of the property for which the house plan is being generated.'),
  floors: z.number().describe('Number of floors in the house plan.'),
  rooms: z.number().describe('Number of rooms (BHK) in the house plan.'),
  budgetRange: z.string().describe('Budget range for the house construction.'),
  purpose: z.string().describe('Purpose of the house (e.g., self-use, rental).'),
  stylePreference: z.string().optional().describe('Optional style preferences for the house design.'),
  vastuPreference: z.string().optional().describe('Optional Vastu preferences for the house design.'),
});
export type CivilConceptInput = z.infer<typeof CivilConceptInputSchema>;

export const CivilConceptOutputSchema = z.object({
  conceptualLayout: z.string().describe('A high-level description of the civil layout, including building placement and site utilization.'),
  floorAllocation: z.string().describe('A floor-by-floor breakdown of space allocation.'),
  roomSizes: z.string().describe('Approximate sizes for major rooms.'),
  stairAndWetAreaLogic: z.string().describe('Logic for the placement of stairs, bathrooms, and kitchen.'),
  assumptions: z.string().describe('Key assumptions made, like setbacks, FSI, and ground conditions.'),
  disclaimer: z.string().default('This is a conceptual civil layout only. It is not for construction and requires validation by a licensed civil engineer.'),
});
export type CivilConceptOutput = z.infer<typeof CivilConceptOutputSchema>;

const civilPrompt = ai.definePrompt({
  name: 'civilConceptPrompt',
  input: { schema: CivilConceptInputSchema },
  output: { schema: CivilConceptOutputSchema },
  prompt: `You are a professional Civil Engineer AI for BrickAi.
Your task is to generate the first stage of a house plan: the Civil Engineering Concept.
Adhere strictly to the user's requirements.

User Requirements:
- Property Details: {{{propertyDetails}}}
- Floors: {{{floors}}}
- Rooms (BHK): {{{rooms}}}
- Budget: {{{budgetRange}}}
- Purpose: {{{purpose}}}
- Style Preference: {{{stylePreference}}}
- Vastu Preference: {{{vastuPreference}}}

Your output must be a conceptual civil layout. Focus on structural and site-level planning.
- Generate a conceptual civil layout, including setbacks and site utilization.
- Define floor-wise space allocation.
- Propose approximate room sizes.
- Detail the logic for placing stairs and wet areas (kitchen/bathrooms).
- Clearly state all assumptions made (e.g., about soil, local bylaws, FSI).
- Include the mandatory disclaimer.
`,
});

const generateCivilConceptFlow = ai.defineFlow(
  {
    name: 'generateCivilConceptFlow',
    inputSchema: CivilConceptInputSchema,
    outputSchema: CivilConceptOutputSchema,
  },
  async (input) => {
    const { output } = await civilPrompt(input);
    return output!;
  }
);

export async function generateCivilConcept(input: CivilConceptInput): Promise<CivilConceptOutput> {
  return generateCivilConceptFlow(input);
}


//== STAGE 2: ARCHITECTURAL CONCEPT ===========================================

export const ArchitecturalConceptInputSchema = z.object({
  approvedCivilConcept: CivilConceptOutputSchema.describe('The approved civil engineering concept from Stage 1.'),
  userFeedback: z.string().optional().describe('Any additional feedback or minor adjustments from the user for this stage.'),
});
export type ArchitecturalConceptInput = z.infer<typeof ArchitecturalConceptInputSchema>;

export const ArchitecturalConceptOutputSchema = z.object({
  roomConnections: z.string().describe('Description of how rooms are interconnected, focusing on flow and movement.'),
  doorWindowPlacement: z.string().describe('Conceptual placement of doors and windows for ventilation and access.'),
  lightAndVentilation: z.string().describe('Strategy for natural light and cross-ventilation.'),
  zoning: z.string().describe('Division of the house into public, private, and service zones.'),
  architecturalStyleNotes: z.string().describe('Notes on how the architectural style is being incorporated.'),
  disclaimer: z.string().default('This is a conceptual architectural plan. It requires validation by a licensed architect.'),
});
export type ArchitecturalConceptOutput = z.infer<typeof ArchitecturalConceptOutputSchema>;

const architecturalPrompt = ai.definePrompt({
    name: 'architecturalConceptPrompt',
    input: { schema: ArchitecturalConceptInputSchema },
    output: { schema: ArchitecturalConceptOutputSchema },
    prompt: `You are a professional Architect AI for BrickAi.
Your task is to generate the second stage: the Architectural Concept.
You MUST build upon the approved Civil Concept provided. Do not change the core layout.

Approved Civil Concept:
- Conceptual Layout: {{{approvedCivilConcept.conceptualLayout}}}
- Floor Allocation: {{{approvedCivilConcept.floorAllocation}}}
- Room Sizes: {{{approvedCivilConcept.roomSizes}}}
- Stair/Wet Areas: {{{approvedCivilConcept.stairAndWetAreaLogic}}}

User Feedback for this stage: {{{userFeedback}}}

Your task is to:
- Define room connections and circulation paths.
- Plan conceptual door and window placements for light, ventilation, and views.
- Detail the zoning strategy (public, private, service areas).
- Explain how the user's preferred style is reflected in the design.
- Include the mandatory disclaimer.
`,
});

const generateArchitecturalConceptFlow = ai.defineFlow(
  {
    name: 'generateArchitecturalConceptFlow',
    inputSchema: ArchitecturalConceptInputSchema,
    outputSchema: ArchitecturalConceptOutputSchema,
  },
  async (input) => {
    const { output } = await architecturalPrompt(input);
    return output!;
  }
);

export async function generateArchitecturalConcept(input: ArchitecturalConceptInput): Promise<ArchitecturalConceptOutput> {
  return generateArchitecturalConceptFlow(input);
}


//== STAGE 3: INTERIOR DESIGN CONCEPT =========================================

export const InteriorConceptInputSchema = z.object({
  approvedArchitecturalConcept: ArchitecturalConceptOutputSchema.describe('The approved architectural concept from Stage 2.'),
  civilConcept: CivilConceptOutputSchema.describe('The original civil concept for context.'),
  userFeedback: z.string().optional().describe('Any additional feedback from the user for this stage.'),
});
export type InteriorConceptInput = z.infer<typeof InteriorConceptInputSchema>;

export const InteriorConceptOutputSchema = z.object({
  furnitureLayout: z.string().describe('Room-by-room conceptual furniture layout ideas.'),
  colorPalette: z.string().describe('A suggested color palette with primary, secondary, and accent colors.'),
  materialSuggestions: z.string().describe('Suggestions for key materials (flooring, walls, countertops).'),
  lightingConcept: z.string().describe('Ideas for ambient, task, and accent lighting.'),
  conceptualImagePrompt: z.string().describe('A text prompt for a text-to-image model to generate a conceptual 3D view of a key area (e.g., living room).'),
  disclaimer: z.string().default('This is a conceptual interior design. Final material and furniture selection should be done with a professional.'),
});
export type InteriorConceptOutput = z.infer<typeof InteriorConceptOutputSchema>;

const interiorPrompt = ai.definePrompt({
    name: 'interiorConceptPrompt',
    input: { schema: InteriorConceptInputSchema },
    output: { schema: InteriorConceptOutputSchema },
    prompt: `You are a professional Interior Designer AI for BrickAi.
Your task is to generate the final stage: the Interior Design Concept.
You MUST work within the approved architectural plan.

Approved Architectural Concept:
- Room Connections: {{{approvedArchitecturalConcept.roomConnections}}}
- Door/Window Placement: {{{approvedArchitecturalConcept.doorWindowPlacement}}}
- Light/Ventilation: {{{approvedArchitecturalConcept.lightAndVentilation}}}
- Zoning: {{{approvedArchitecturalConcept.zoning}}}

User Feedback for this stage: {{{userFeedback}}}

Your task is to:
- Propose a conceptual furniture layout for key rooms.
- Suggest a cohesive color palette.
- Recommend materials for flooring, walls, and surfaces.
- Describe a lighting concept (ambient, task, accent).
- Provide a text prompt for a text-to-image model to generate a single conceptual image of the main living space.
- Include the mandatory disclaimer.
`,
});

const generateInteriorConceptFlow = ai.defineFlow(
  {
    name: 'generateInteriorConceptFlow',
    inputSchema: InteriorConceptInputSchema,
    outputSchema: InteriorConceptOutputSchema,
  },
  async (input) => {
    const { output } = await interiorPrompt(input);
    return output!;
  }
);

export async function generateInteriorConcept(input: InteriorConceptInput): Promise<InteriorConceptOutput> {
  return generateInteriorConceptFlow(input);
}
