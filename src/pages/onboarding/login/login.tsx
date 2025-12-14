import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import * as z from 'zod';
import { loginValidationSchema } from './loginValidationSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

type LoginFormType = z.infer<typeof loginValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginValidationSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onSubmit = async (data: LoginFormType) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResponse = {
        access_token:
          'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImY3Y2Q1ZmYzNDNhMWZkYjI3MTdiNDBhZTE2ZjliYjdlIn0.eyJlbWFpbCI6InJvc2hhbm9qaGFvZmZpY2lhbEBnbWFpbC5jb20iLCJyb2xlIjoiZ3VhcmRpYW4iLCJzdWIiOiIyYmMxZTIwZGM3M2M0YTIyIiwiZXhwIjoxNzY0NTk5MjYxLCJpYXQiOjE3NjQ1NzA0NjF9.DflAlQ7FKASTR_rjF5bq0O2Lok08efGgGJOnmMA3ugSonDK91QAb6AopO54825EdHCYLF8Sa-Hd5OE1vTcODxg',
        // eslint-disable-next-line react-hooks/purity
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        refresh_toekn: 'refresh_toke_stored_in_httponly_cookie',
      };
      localStorage.setItem('access_token', mockResponse.access_token);
      localStorage.setItem('expiresAt', mockResponse.expiresAt);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Failed', error);
      setIsSubmitting(false);
    }

    console.log(data);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <p className="mt-2 text-muted-foreground">Sign in to access your healthcare dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <div className="relative">
                          <Input
                            placeholder="Enter password"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                          ></Input>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage>{errors.password?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <a className="text-primary hover:underline cursor-pointer transition-all">
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" /> Log In
                    </>
                  )}
                </Button>
                <p className="text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/signup"
                    className="text-primary hover:underline transition-all cursor-pointer"
                  >
                    Sign Up
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
