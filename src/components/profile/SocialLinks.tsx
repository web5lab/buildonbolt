import React from 'react';
import { Link2, Github, Twitter, Linkedin } from 'lucide-react';



export function SocialLinks({ profileData }) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <SocialLink href={profileData.website} icon={Link2} label="Website" />
      <SocialLink href={profileData.github} icon={Github} label="GitHub" />
      <SocialLink href={profileData.twitter} icon={Twitter} label="Twitter" />
      <SocialLink href={profileData.linkedin} icon={Linkedin} label="LinkedIn" />
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors group"
    >
      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
}