import React, { useState } from 'react';
import { Mail, X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { OTPForm } from './OTPForm';
import { RegisterForm } from './RegisterForm';



export function LoginModal({ onClose }) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp'>('login');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="bg-primary-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {authMode === 'login' && 'Sign in with Password'}
            {authMode === 'register' && 'Create an Account'}
            {authMode === 'otp' && 'Sign in with OTP'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {authMode === 'login' && 'Enter your email and password to continue'}
            {authMode === 'register' && 'Fill in your details to get started'}
            {authMode === 'otp' && 'We send you a verification code'}
          </p>
        </div>

        {authMode === 'login' && (
          <LoginForm
            onSuccess={() => {
              onClose();
              window.location.reload();
            }}
            onRegister={() => setAuthMode('register')}
            onOtpLogin={() => setAuthMode('otp')}
          />
        )}
        
        {authMode === 'register' && (
          <RegisterForm
            onSuccess={() => {
              onClose();
              window.location.reload();
            }}
            onToggleMode={() => setAuthMode('login')}
          />
        )}
        
        {authMode === 'otp' && (
          <OTPForm
            onSuccess={() => {
              onClose();
              window.location.reload();
            }}
            onToggleMode={() => setAuthMode('login')}
          />
        )}
      </div>
    </div>
  );
}