import { z } from 'zod';

export const CoordinateSchema = z
    .object({
        longitude: z.number().min(-180).max(180),
        latitude: z.number().min(-90).max(-180),
    })
    .strict()
    .describe('Coordinate');
export type Coordinate = z.infer<typeof CoordinateSchema>;

export const DmsCoordinateSchema = z.union([
    z
        .object({
            degrees: z.number().min(0).max(90),
            minutes: z.number().min(0).lt(60),
            seconds: z.number().min(0).lt(60),
            direction: z.enum(['N', 'S']),
        })
        .strict()
        .describe('DmsCoordinate'),
    z
        .object({
            degrees: z.number().min(0).max(180),
            minutes: z.number().min(0).lt(60),
            seconds: z.number().min(0).lt(60),
            direction: z.enum(['E', 'W']),
        })
        .strict()
        .describe('DmsCoordinate'),
]);
export type DmsCoordinate = z.infer<typeof DmsCoordinateSchema>;

export const DmCoordinateSchema = z.union([
    z
        .object({
            degrees: z.number().min(0).max(180),
            // decimal minutes
            minutes: z.number().min(0).lt(59),
            direction: z.enum(['N', 'S']),
        })
        .strict()
        .describe('DmCoordinate'),
    z
        .object({
            degrees: z.number().min(0).max(180),
            // decimal minutes
            minutes: z.number().min(0).lt(60),
            direction: z.enum(['E', 'W']),
        })
        .strict()
        .describe('DmCoordinate'),
]);
export type DmCoordinate = z.infer<typeof DmCoordinateSchema>;
