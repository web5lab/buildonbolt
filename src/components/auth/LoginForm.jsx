import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { loginWithPassword } from '../../lib/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});



export function LoginForm({ onSuccess, onRegister, onOtpLogin }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const { token, user } = await loginWithPassword(data.email, data.password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onRegister}
            className="text-primary-500 hover:text-primary-600"
          >
            Sign up
          </button>
        </p>
        <button
          type="button"
          onClick={onOtpLogin}
          className="text-primary-500 hover:text-primary-600 text-sm"
        >
          Sign in with OTP instead
        </button>
      </div>
    </form>
  );
}