import { z } from 'zod';

export const formSchema = z.object({
  templateId: z.string(),
  name: z.string(),
  startDate: z.string().date().default(() => {
    const date = new Date(new Date().getFullYear(), 0, 1); // get first day of the year
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string
}),
  endDate: z.string().date().default(() => {
    const date = new Date(new Date().getFullYear(), 11, 31); // get first day of the year
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string
}),
});

export type FormSchema = typeof formSchema;
