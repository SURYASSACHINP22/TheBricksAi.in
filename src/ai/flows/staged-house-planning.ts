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
import {
    CivilConceptInputSchema,
    type CivilConceptInput,
    CivilConceptOutputSchema,
    type CivilConceptOutput,
    ArchitecturalConceptInputSchema,
    type ArchitecturalConceptInput,
    ArchitecturalConceptOutputSchema,
    type ArchitecturalConceptOutput,
    InteriorConceptInputSchema,
    type InteriorConceptInput,
    InteriorConceptOutputSchema,
    type InteriorConceptOutput,
} from './staged-house-planning.types';

//== STAGE 1: CIVIL ENGINEERING CONCEPT =======================================

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
