/**
 * The `ForgotPasswordForm` component is a React functional component that renders a form for resetting a user's password.
 * 
 * The form includes the following fields:
 * - `email`: The user's email address
 * - `previousPassword`: The user's current password
 * - `newPassword`: The new password the user wants to set
 * 
 * The form uses the `react-hook-form` library for form handling and validation, and the `zod` library for schema validation.
 * 
 * When the form is submitted, the `onSubmit` function is called, which makes a request to the `UpdatePassword` function to update the user's password. If the update is successful, a success toast message is displayed and the user is redirected to the sign-in page. If the update fails, an error toast message is displayed.
 * 
 * The component also includes a toggle button to show/hide the previous and new passwords.
 */
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { LockIcon, LockKeyholeOpen, Eye, EyeOff, Mail } from 'lucide-react';
import { UpdatePassword } from '@/core/actions/forgetPassword/update';
import Link from 'next/link';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  previousPassword: z.string().min(4, 'Password must be at least 4 characters long'),
  newPassword: z.string().min(4, 'Password must be at least 4 characters long'),
});
const ForgotPasswordForm: React.FC = () => {
  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      previousPassword: '',
      newPassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    // Here you would make a request to your API to update the password

    const result =  await UpdatePassword({
        email: data.email,
        previousPassword: data.previousPassword,
        newPassword: data.newPassword,
      });
    if (result?.success) {
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been updated',
        variant: 'default',
      });
      
      router.replace('/sign-in'); // Redirect to dashboard or login page
    } else {
      toast({
        title: 'Password Reset Failed',
        description: 'Please check your information and try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-gradient-to-t from-[#010101] to-[#0B0D37] w-[100vw] lg:w-[40%] h-screen flex flex-col items-center justify-center text-white'>
      <h1 className="font-bold text-4xl">Ram Mohan Mishra</h1>
      <p className="font-semibold text-lg">Reset Your Password</p>
      <div className="text-white font-semibold p-8 space-y-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="flex items-center">
              <Input
                id="email"
                className='bg-[#1E1E1E] font-thin text-white w-full'
                placeholder='Enter your email'
                type="email"
                {...form.register('email')}
              />
              <Mail className='bg-blue-500 w-10 h-9 rounded-md' />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="previousPassword" className="block text-sm font-medium">
              Previous Password
            </label>
            <div className="flex items-center">
              <Input
                id="previousPassword"
                className='bg-[#1E1E1E] font-thin text-white w-full'
                placeholder='Enter your previous password'
                type={showPreviousPassword ? "text" : "password"}
                {...form.register('previousPassword')}
              />
              <button
                type="button"
                className="bg-blue-500 w-10 h-9 rounded-md flex items-center justify-center"
                onClick={() => setShowPreviousPassword(!showPreviousPassword)}
              >
                {showPreviousPassword ? <EyeOff className='text-white' /> : <Eye className='text-white' />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <div className="flex items-center">
              <Input
                id="newPassword"
                className='bg-[#1E1E1E] font-thin text-white w-full'
                placeholder='Enter your new password'
                type={showNewPassword ? "text" : "password"}
                {...form.register('newPassword')}
              />
              <button
                type="button"
                className="bg-blue-500 w-10 h-9 rounded-md flex items-center justify-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className='text-white' /> : <Eye className='text-white' />}
              </button>
            </div>
          </div>
          <Button className="w-full rounded-lg bg-blue-500 text-white font-semibold" type="submit">Reset Password</Button>
          <div className=' w-full flex justify-end text-[13px]' >

        <Link href="sign-in" >Sign In?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
