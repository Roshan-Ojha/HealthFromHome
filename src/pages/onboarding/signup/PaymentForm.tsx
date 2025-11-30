import { CreditCard, MapPin } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Input, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import type { getSignUpValidationSchema } from './signupValidationSchema';
import * as z from 'zod';

type SignUpFormType = z.infer<typeof getSignUpValidationSchema>;

export default function PaymentForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<SignUpFormType>();
  return (
    <div className="space-y-6 p-6 bg-secondary/30 rounded-lg border-2 border-primary/20">
      <div className="flex items-center gap-2 text-primary">
        <CreditCard className="w-5 h-5" />
        <h3>Payment Information</h3>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number *</FormLabel>
              <FormControl>
                <Input placeholder="1234 5678 9012 3456" maxLength={19} {...field}></Input>
              </FormControl>
              <FormMessage>{errors.cardNumber?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date *</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YY" maxLength={5} {...field}></Input>
                </FormControl>
                <FormMessage>{errors.expiryDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV *</FormLabel>
                <FormControl>
                  <Input placeholder="123" maxLength={4} {...field}></Input>
                </FormControl>
                <FormMessage>{errors.cvv?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name *</FormLabel>
              <FormControl>
                <Input placeholder="Cardholder Name" {...field}></Input>
              </FormControl>
              <FormMessage>{errors.cardholderName?.message}</FormMessage>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-primary">
          <MapPin className="w-5 h-5" />
          <h4>Billing Address</h4>
        </div>

        <FormField
          control={control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address *</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field}></Input>
              </FormControl>
              <FormMessage>{errors.street?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Input placeholder="New York" {...field}></Input>
                </FormControl>
                <FormMessage>{errors.city?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province *</FormLabel>
                <FormControl>
                  <Input placeholder="NY" {...field}></Input>
                </FormControl>
                <FormMessage>{errors.state?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP/Postal *</FormLabel>
                <FormControl>
                  <Input placeholder="10001" {...field}></Input>
                </FormControl>
                <FormMessage>{errors.zipCode?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl>
                  <Input placeholder="United States" {...field}></Input>
                </FormControl>
                <FormMessage>{errors.country?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
