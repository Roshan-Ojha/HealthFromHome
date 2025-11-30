import { UserPlus } from 'lucide-react';

import { getSignUpValidationSchema } from './signupValidationSchema';

import * as z from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import PaymentForm from './PaymentForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Button,
  Label,
  RadioGroupItem,
  RadioGroup,
  Input,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Link } from 'react-router';

type SignUpFormType = z.infer<typeof getSignUpValidationSchema>;

const roles = [
  { id: 'patient', name: 'Patient' },
  { id: 'doctor', name: 'Doctor' },
  { id: 'nurse', name: 'Nurse' },
  { id: 'guardian', name: 'Guardian' },
  { id: 'admin', name: 'Administrator' },
];

export function SignUp() {
  const methods = useForm<SignUpFormType>({
    resolver: zodResolver(getSignUpValidationSchema),
    mode: 'all',
    defaultValues: {
      fullName: '',
      email: '',
      gender: 'male',
      role: '',
      password: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = (data: SignUpFormType) => {
    console.log(data);
  };
  const isGuardian = watch('role') === 'guardian';

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-foreground">Create Your Account</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to get started with Health From Home
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full Name" {...field}></Input>
                      </FormControl>
                      <FormMessage>{errors.fullName?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field}></Input>
                      </FormControl>
                      <FormMessage>{errors.email?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter password" type="password" {...field}></Input>
                      </FormControl>
                      <FormMessage>{errors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full space-y-3">
                      <FormLabel>Gender *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="others" id="others" />
                            <Label htmlFor="others">Others</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>{errors.gender?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Role *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{errors.role?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                {isGuardian && <PaymentForm />}
                <Button type="submit" className="w-full">
                  <UserPlus className="w-5 h-5" /> Sign Up
                </Button>
                <p className="text-center text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="text-primary hover:underline transition-all">
                    Log in
                  </Link>
                </p>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
