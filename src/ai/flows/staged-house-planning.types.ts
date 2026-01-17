import { z } from 'zod';

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
  civilPlanDataUri: z
    .string()
    .describe(
      "A data URI of the primary conceptual civil layout drawing, including building placement and site utilization. Must include a MIME type and use Base64 encoding. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  foundationPlanDataUri: z
    .string()
    .describe(
      "A data URI of the conceptual foundation plan. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  columnLayoutDataUri: z
    .string()
    .describe(
      "A data URI of the conceptual column layout diagram. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  floorAllocation: z.string().describe('A floor-by-floor breakdown of space allocation.'),
  roomSizes: z.string().describe('Approximate sizes for major rooms.'),
  stairAndWetAreaLogic: z.string().describe('Logic for the placement of stairs, bathrooms, and kitchen.'),
  assumptions: z.string().describe('Key assumptions made, like setbacks, FSI, and ground conditions.'),
  disclaimer: z.string().default('This is a conceptual civil layout only. It is not for construction and requires validation by a licensed civil engineer.'),
});
export type CivilConceptOutput = z.infer<typeof CivilConceptOutputSchema>;


//== STAGE 2: ARCHITECTURAL CONCEPT ===========================================

export const ArchitecturalConceptInputSchema = z.object({
  approvedCivilConcept: CivilConceptOutputSchema.describe('The approved civil engineering concept from Stage 1.'),
  userFeedback: z.string().optional().describe('Any additional feedback or minor adjustments from the user for this stage.'),
});
export type ArchitecturalConceptInput = z.infer<typeof ArchitecturalConceptInputSchema>;

export const ArchitecturalConceptOutputSchema = z.object({
  architecturalPlanDataUri: z
    .string()
    .describe(
      "A data URI of the 2D architectural floor plan, showing room connections and door/window placements. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  threeDModelDataUri: z
    .string()
    .describe(
      "A data URI of a 3D rendering of the building's exterior structure. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  architecturalStyleNotes: z.string().describe('Notes on how the architectural style is being incorporated.'),
  zoning: z.string().describe('Division of the house into public, private, and service zones.'),
  lightAndVentilation: z.string().describe('Strategy for natural light and cross-ventilation.'),
  disclaimer: z.string().default('This is a conceptual architectural plan. It requires validation by a licensed architect.'),
});
export type ArchitecturalConceptOutput = z.infer<typeof ArchitecturalConceptOutputSchema>;


//== STAGE 3: INTERIOR DESIGN CONCEPT =========================================

export const InteriorConceptInputSchema = z.object({
  approvedArchitecturalConcept: ArchitecturalConceptOutputSchema.describe('The approved architectural concept from Stage 2.'),
  civilConcept: CivilConceptOutputSchema.describe('The original civil concept for context.'),
  userFeedback: z.string().optional().describe('Any additional feedback from the user for this stage.'),
});
export type InteriorConceptInput = z.infer<typeof InteriorConceptInputSchema>;

export const InteriorConceptOutputSchema = z.object({
  interiorRenderDataUri: z
    .string()
    .describe(
      "A data URI of a 3D conceptual rendering of the main living space. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  furnitureLayoutPlanDataUri: z
    .string()
    .describe(
      "A data URI of the 2D conceptual furniture layout plan. Format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  colorPalette: z.string().describe('A suggested color palette with primary, secondary, and accent colors.'),
  materialSuggestions: z.string().describe('Suggestions for key materials (flooring, walls, countertops).'),
  lightingConcept: z.string().describe('Ideas for ambient, task, and accent lighting.'),
  disclaimer: z.string().default('This is a conceptual interior design. Final material and furniture selection should be done with a professional.'),
});
export type InteriorConceptOutput = z.infer<typeof InteriorConceptOutputSchema>;
