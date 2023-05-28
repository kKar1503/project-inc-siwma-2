import { z } from 'zod';


const forgetPassword = z.object({
    email: z.string(),
});


export type ForgetPasswordQueryParameter = z.infer<typeof forgetPassword>;

export default {
    post: {
        query: forgetPassword,
    },
};
