import Link from 'next/link';

import SignUpForm from './_components/signup-form';

export default function SignupPage() {
  return (
    <div className="mx-auto grid w-[400px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <SignUpForm />
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
