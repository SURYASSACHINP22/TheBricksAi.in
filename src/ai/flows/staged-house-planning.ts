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
Adhere strictly to the user's requirements. Your output MUST be a set of conceptual drawings and diagrams in data URI format.

User Requirements:
- Property Details: {{{propertyDetails}}}
- Floors: {{{floors}}}
- Rooms (BHK): {{{rooms}}}
- Budget: {{{budgetRange}}}
- Purpose: {{{purpose}}}
- Style Preference: {{{stylePreference}}}
- Vastu Preference: {{{vastuPreference}}}

Your output must contain the following drawings as data URIs:
- civilPlanDataUri: A conceptual civil layout drawing, including setbacks and site utilization.
- foundationPlanDataUri: A conceptual drawing of the foundation plan.
- columnLayoutDataUri: A conceptual drawing showing the positions of columns/poles.

You must also provide the following details in text format:
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
You MUST build upon the approved Civil Concept drawing provided. Do not change the core layout.

Approved Civil Plan Drawing:
{{media url=approvedCivilConcept.civilPlanDataUri}}

User Feedback for this stage: {{{userFeedback}}}

Your task is to generate the following as data URIs:
- architecturalPlanDataUri: A detailed 2D architectural floor plan showing room connections, circulation, and conceptual door/window placements.
- threeDModelDataUri: A 3D exterior rendering of the building structure based on the plan.

You must also provide the following details in text format:
- Detail the zoning strategy (public, private, service areas).
- Explain your strategy for natural light and cross-ventilation.
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
You MUST work within the approved architectural plan provided.

Approved Architectural Plan Drawing:
{{media url=approvedArchitecturalConcept.architecturalPlanDataUri}}

User Feedback for this stage: {{{userFeedback}}}

Your task is to generate the following as data URIs:
- interiorRenderDataUri: A 3D conceptual rendering of a key area (e.g., the main living space).
- furnitureLayoutPlanDataUri: A 2D conceptual furniture layout diagram for key rooms.

You must also provide the following details in text format:
- Suggest a cohesive color palette.
- Recommend materials for flooring, walls, and surfaces.
- Describe a lighting concept (ambient, task, accent).
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
