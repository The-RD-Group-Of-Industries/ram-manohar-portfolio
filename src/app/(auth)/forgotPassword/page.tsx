// This line enables client-side rendering for this component
'use client';

// Import the ForgetPassword component from the specified path
import ForgetPassword from "@/components/auth/forgotPassword/page";

// Define and export the default function component
export default function SignInForm() {
  return(
    // Wrap the ForgetPassword component in a div
    <div>
      {/* Render the ForgetPassword component */}
      <ForgetPassword/>
    </div>
  )
}
