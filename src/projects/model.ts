import { z } from 'zod';

export const projectSchema = z.lazy(() =>
    z.object({
        _id: z.string(),
        name: z.string(),
        description: z.string(),
        leader: z.string(),
        scrumMaster: z.string(),
        productOwner: z.string(),
        participants: z.array(z.string())
    })
);

export type Project = z.infer<typeof projectSchema>;
