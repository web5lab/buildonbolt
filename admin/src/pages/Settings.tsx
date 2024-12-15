import React, { useState } from 'react';
import { Settings as SettingsIcon, Mail, Shield, Bell, Database, Key, Server } from 'lucide-react';

interface Setting {
  id: string;
  name: string;
  value: string;
  description: string;
  type: 'text' | 'email' | 'number' | 'toggle';
}

export function Settings() {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'smtp_host',
      name: 'SMTP Host',
      value: 'smtp.gmail.com',
      description: 'Email server hostname for sending notifications',
      type: 'text'
    },
    {
      id: 'smtp_port',
      name: 'SMTP Port',
      value: '587',
      description: 'Email server port number',
      type: 'number'
    },
    {
      id: 'admin_email',
      name: 'Admin Email',
      value: 'admin@example.com',
      description: 'Primary email for admin notifications',
      type: 'email'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement settings update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id: string, value: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/60 border-t-white" />
              Saving...
            </>
          ) : (
            <>
              <SettingsIcon className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-xl">
          Settings saved successfully!
        </div>
      )}

      <div className="grid gap-6">
        {/* Email Settings */}
        <SettingsSection
          title="Email Configuration"
          description="Configure email server settings for notifications"
          icon={Mail}
        >
          <div className="grid gap-4">
            {settings
              .filter(setting => setting.id.startsWith('smtp_'))
              .map(setting => (
                <SettingField
                  key={setting.id}
                  setting={setting}
                  onChange={handleChange}
                />
              ))}
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          title="Security"
          description="Manage security settings and access controls"
          icon={Shield}
        >
          <div className="grid gap-4">
            <ToggleSetting
              label="Two-Factor Authentication"
              description="Require 2FA for admin access"
              enabled={true}
              onChange={() => {}}
            />
            <ToggleSetting
              label="API Key Authentication"
              description="Enable API key authentication for external services"
              enabled={false}
              onChange={() => {}}
            />
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          title="Notifications"
          description="Configure notification preferences"
          icon={Bell}
        >
          <div className="grid gap-4">
            <ToggleSetting
              label="Email Notifications"
              description="Send email notifications for important events"
              enabled={true}
              onChange={() => {}}
            />
            <ToggleSetting
              label="Browser Notifications"
              description="Enable browser push notifications"
              enabled={false}
              onChange={() => {}}
            />
          </div>
        </SettingsSection>

        {/* System Settings */}
        <SettingsSection
          title="System"
          description="Manage system-wide configurations"
          icon={Server}
        >
          <div className="grid gap-4">
            {settings
              .filter(setting => setting.id === 'admin_email')
              .map(setting => (
                <SettingField
                  key={setting.id}
                  setting={setting}
                  onChange={handleChange}
                />
              ))}
            <ToggleSetting
              label="Maintenance Mode"
              description="Put the system in maintenance mode"
              enabled={false}
              onChange={() => {}}
            />
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function SettingsSection({ title, description, icon: Icon, children }: SettingsSectionProps) {
  return (
    <div className="bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <Icon className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

interface SettingFieldProps {
  setting: Setting;
  onChange: (id: string, value: string) => void;
}

function SettingField({ setting, onChange }: SettingFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {setting.name}
      </label>
      <input
        type={setting.type}
        value={setting.value}
        onChange={(e) => onChange(setting.id, e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-300 bg-white dark:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
      />
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
    </div>
  );
}

interface ToggleSettingProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}

function ToggleSetting({ label, description, enabled, onChange }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}