import z from "zod";

const SlideSchema = z.object({
  heading: z.string().min(1, { message: "Heading is required" }),
  description: z
    .string()
    .min(30, { message: "Description must be 30 characters or more." })
    .max(240, {
      message: "Description must not be more than 240 character.",
    }),
  imageUrl: z.string().url(),
});

export const createStoryValidationSchema = z.object({
  category: z.enum([
    "Food",
    "Health and Fitness",
    "Movies",
    "Education",
    "Travel",
  ]),
  slides: z
    .array(SlideSchema)
    .min(3, { message: "Story must contain atleast 3 slides." })
    .max(6, { message: "Story must not cantain  more than 6 slides" }),
});
