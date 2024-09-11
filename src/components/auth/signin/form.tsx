/**
 * Renders a sign-in form component for the application.
 *
 * The `SignInForm` component is responsible for rendering the sign-in form, handling form submission, and managing the sign-in process. It uses the `react-hook-form` library for form handling and the `zod` library for form validation.
 *
 * The form includes fields for email/username and password, with validation rules defined in the `signInSchema`. Upon form submission, the component calls the `signIn` function from the `next-auth/react` library to authenticate the user. If the sign-in is successful, the user is redirected to the `/dashboard` route. If there is an error, an appropriate error message is displayed using the `useToast` hook.
 *
 * The component also includes a toggle button to show/hide the password, and a link to the "Forgot Password" page.
 *
 * @returns The `SignInForm` component.
 */
"use client"
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form as UIForm,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/resourse/schema/signInSchema';
import { Email } from '@carbon/icons-react';
import { Eye, EyeOff, LockIcon } from 'lucide-react';
import Link from 'next/link';

const SignInForm: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className='bg-gradient-to-t from-[#010101] to-[#0B0D37] w-[100vw] lg:w-[40%] h-screen flex flex-col items-center justify-center text-white'>
    <h1 className="font-bold text-4xl">Ram Mohan Mishra</h1>
    <p className="font-semibold text-lg">Log in to your account</p>
      <div className="text-white font-semibold p-8 space-y-8  rounded-lg shadow-md w-full max-w-md">
       
        <UIForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="identifier">Email</FormLabel>
                  <div className="flex items-center">
                    <Input
                      id="identifier"
                      className='bg-[#1E1E1E] font-thin text-white w-full'
                      placeholder='eg. ram@gmail.com'
                      {...field}
                    />
                    <Email className='bg-blue-500 w-10 h-9 rounded-md ' />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <div className="flex items-center">
                    <Input
                      id="password"
                      className='bg-[#1E1E1E] font-thin text-white w-full' 
                      placeholder='1234'
                      type={showNewPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                type="button"
                className="bg-blue-500 w-10 h-9 rounded-md flex items-center justify-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className='text-white' /> : <Eye className='text-white' />}
              </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full rounded-lg bg-blue-500 text-white font-semibold" type="submit">Sign In</Button>
            <div className=' w-full flex justify-end text-[13px]' >

<Link href="forgotPassword" >Forgot Password?</Link>
  </div>
          </form>
        </UIForm>
      </div>
    </div>
  );
};

export default SignInForm;
