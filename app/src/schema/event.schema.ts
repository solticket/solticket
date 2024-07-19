import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string({
    required_error: 'Please enter a title',
  }),
  description: z.string({
    required_error: 'Please enter a description',
  }),
  date: z.string({
    required_error: 'Please enter a date',
  }),
  location: z.string({
    required_error: 'Please enter a location',
  }),
  count: z.number().positive(),
  image: z.any({
    required_error: 'Please upload an image',
  }),
})

export const uploadImageSchema = z.object({
  image: z.string({
    required_error: 'Please upload an image',
  }),
})
