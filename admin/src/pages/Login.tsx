import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Loader2, Shield } from 'lucide-react';
import { loginAdmin } from '../lib/api';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await loginAdmin(data.email, data.password);

      if (response.token && response.user) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-100 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200 dark:border-dark-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 animate-float">
            <Shield className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Use admin/admin to sign in
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('email', { value: 'admin' })}
                type="text"
                placeholder="Username"
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
                {...register('password', { value: 'admin' })}
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
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Testing credentials: admin / admin
          </p>
        </div>
      </div>
    </div>
  );
}