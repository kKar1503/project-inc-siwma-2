import { z } from 'zod';


const emailSchema = z.object({
    email: z.string(),
});


export type ForgetPasswordQueryParameter = z.infer<typeof emailSchema>;

export default {
    post: {
        query: emailSchema,
    },
};
