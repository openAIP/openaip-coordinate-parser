import { z } from 'zod';

export const CoordinateSchema = z
    .object({
        longitude: z.number(),
        latitude: z.number(),
    })
    .strict()
    .describe('Coordinate');
export type Coordinate = z.infer<typeof CoordinateSchema>;

export const DmsCoordinateSchema = z
    .object({
        degrees: z.number(),
        minutes: z.number(),
        seconds: z.number(),
        direction: z.string().length(1),
    })
    .strict()
    .describe('DmsCoordinate');
export type DmsCoordinate = z.infer<typeof DmsCoordinateSchema>;

export const DmCoordinateSchema = z
    .object({
        degrees: z.number(),
        // decimal minutes
        minutes: z.number(),
        direction: z.string().length(1),
    })
    .strict()
    .describe('DmCoordinate');
export type DmCoordinate = z.infer<typeof DmCoordinateSchema>;