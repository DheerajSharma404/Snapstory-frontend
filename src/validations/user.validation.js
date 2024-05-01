import z from "zod";

export const userValidationSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 character long" }),
  password: z
    .string()
    .min(8, { message: "Passwrod must be atleast 8 character long." }),
});


