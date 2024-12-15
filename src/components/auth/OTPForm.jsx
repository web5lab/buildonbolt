import React from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { sendOTP, verifyOTP } from '../../lib/auth';



export function OTPForm({ onSuccess, onToggleMode }) {
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [step, setStep] = React.useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await sendOTP(email);
      setStep('otp');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { token, user } = await verifyOTP(email, otp);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      {step === 'email' ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Code...
              </>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white text-center text-2xl tracking-widest"
            maxLength={6}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white p-3 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </button>
          <button
            type="button"
            onClick={() => setStep('email')}
            className="w-full text-primary-500 hover:text-primary-600 text-sm"
          >
            Didn't receive the code? Send again
          </button>
        </form>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-primary-500 hover:text-primary-600 text-sm"
        >
          Sign in with password instead
        </button>
      </div>
    </div>
  );
}