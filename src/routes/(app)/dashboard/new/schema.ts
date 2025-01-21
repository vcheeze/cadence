import { z } from 'zod';

export const formSchema = z.object({
  templateId: z.string(),
  name: z.string().nonempty(),
  totalReadings: z.number().min(1).default(365),
  currentReadingNumber: z.number().min(1).default(1),
  startDate: z.string().date().default(() => {
    const date = new Date(new Date().getFullYear(), 0, 1); // get first day of the year
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string
}),
  endDate: z.string().date().default(() => {
    const date = new Date(new Date().getFullYear(), 11, 31); // get last day of the year
    const tzoffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    return new Date(date.valueOf() - tzoffset).toISOString().split('T')[0]; // transform into string
}),
}).refine(data => data.currentReadingNumber <= data.totalReadings, {
  message: 'Next reading number cannot be greater than the number of total readings',
  path: ['currentReadingNumber']
});

export type FormSchema = typeof formSchema;
