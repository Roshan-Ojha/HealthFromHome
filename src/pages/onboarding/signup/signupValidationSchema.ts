import * as z from 'zod';

const baseSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  gender: z.enum(['male', 'female', 'others'], { message: 'Gender is required' }),
  role: z.string().min(1, 'Role is required'),
});

const guardianSchema = z.object({
  cardNumber: z
    .string()
    .min(13, 'Card number must be at least 13 digits')
    .max(19, 'Card number must not exceed 19 digits')
    .regex(/^[\d\s]+$/, 'Card number must contain only numbers'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z
    .string()
    .min(3, 'CVV must be at least 3 digits')
    .max(4, 'CVV must not exceed 4 digits')
    .regex(/^\d+$/, 'CVV must contain only numbers'),
  cardholderName: z.string().min(2, 'Cardholder name is required'),
  street: z.string().nonempty('Street Address is required'),
  city: z.string().nonempty('City is reuired'),
  state: z.string().nonempty('State is required'),
  zipCode: z.string().nonempty('Zip code is required'),
  country: z.string().nonempty('Country is required'),
});

export const getSignUpValidationSchema = baseSchema
  .extend({
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardholderName: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role.toLowerCase() === 'guardian') {
      const result = guardianSchema.safeParse(data);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            path: issue.path,
            code: 'custom',
            message: issue.message,
          });
        });
      }
    }
  });
