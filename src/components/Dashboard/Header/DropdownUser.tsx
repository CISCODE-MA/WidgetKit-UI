import { useT } from '@ciscode/ui-translate-core';
import React, { useState } from 'react';
import { Link } from 'react-router';
import ClickOutside from '../ClickOutside';

export type DropdownUserConfig = {
  /** Full display name shown in the navbar trigger */
  fullName?: string;
  /** Role label shown below the name */
  role?: string;
  /** When true, renders animated skeleton placeholders instead of real data */
  isLoading?: boolean;
};

type DropdownUserProps = {
  onLogout?: () => void;
  /** Authenticated user data to display in the header */
  user?: DropdownUserConfig;
};

/** Animated skeleton placeholder for avatar + name/role text */
const UserSkeleton: React.FC<{ size?: 'sm' | 'md'; rows?: [string, string] }> = ({
  size = 'md',
  rows = ['w-24', 'w-16'],
}) => {
  const circleClass = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <span className={`shrink-0 rounded-full bg-gray-200 dark:bg-meta-4 ${circleClass}`} />
      <div className="flex flex-col gap-1.5">
        <span className={`h-3 rounded-full bg-gray-200 dark:bg-meta-4 ${rows[0]}`} />
        <span className={`h-2.5 rounded-full bg-gray-200 dark:bg-meta-4 ${rows[1]}`} />
      </div>
    </div>
  );
};

/** Generates a gradient initials avatar from a name */
const UserAvatar: React.FC<{ name: string; size?: 'sm' | 'md' }> = ({ name, size = 'md' }) => {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

  const gradients = [
    'from-[#667EEA] to-[#764BA2]',
    'from-[#F093FB] to-[#F5576C]',
    'from-[#4FACFE] to-[#00F2FE]',
    'from-[#43E97B] to-[#38F9D7]',
    'from-[#FA709A] to-[#FEE140]',
    'from-[#A18CD1] to-[#FBC2EB]',
  ];
  const gradient = gradients[name.charCodeAt(0) % gradients.length];
  const sizeClass = size === 'sm' ? 'h-9 w-9 text-xs' : 'h-11 w-11 text-sm';

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} ${sizeClass} font-semibold text-white`}
    >
      {initials}
    </span>
  );
};

const DropdownUser: React.FC<DropdownUserProps> = ({ onLogout, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = useT('templateFe');

  const isLoading = user?.isLoading ?? false;
  const displayName = user?.fullName || 'Thomas Anree';
  const displayRole = user?.role || t('roles.superAdmin', { defaultValue: 'superAdmin' });

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-gray dark:hover:bg-meta-4"
        aria-label="User menu"
        aria-expanded={dropdownOpen}
      >
        {isLoading ? (
          <span className="hidden lg:block">
            <UserSkeleton size="sm" rows={['w-24', 'w-16']} />
          </span>
        ) : (
          <span className="hidden lg:flex lg:flex-col ltr:text-right rtl:text-left">
            <span className="text-sm font-semibold text-black dark:text-white leading-tight">
              {displayName}
            </span>
            <span className="text-xs text-body dark:text-bodydark">{displayRole}</span>
          </span>
        )}

        {isLoading ? (
          <span className="shrink-0 h-9 w-9 rounded-full bg-gray-200 dark:bg-meta-4 animate-pulse" />
        ) : (
          <UserAvatar name={displayName} size="sm" />
        )}

        <svg
          className={`hidden text-bodydark1 transition-transform sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {dropdownOpen && (
        <div className="absolute z-[9999] mt-2 ltr:right-0 rtl:left-0 w-64 flex flex-col rounded-xl border-[1.5px] border-stroke bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-strokedark dark:bg-boxdark dark:shadow-[0_8px_32px_rgba(0,0,0,0.40)]">
          {/* Identity header */}
          <div className="flex items-center gap-3 border-b border-stroke px-4 py-4 dark:border-strokedark">
            {isLoading ? (
              <UserSkeleton size="md" rows={['w-32', 'w-20']} />
            ) : (
              <>
                <UserAvatar name={displayName} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-black dark:text-white">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-body dark:text-bodydark">{displayRole}</p>
                </div>
              </>
            )}
          </div>

          {/* Menu items */}
          <ul className="flex flex-col py-2">
            <li>
              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-black transition-colors hover:bg-gray hover:text-primary dark:text-white dark:hover:bg-meta-4 dark:hover:text-primary"
              >
                {/* Person icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bodydark1">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {t('dropdown.profile')}
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-black transition-colors hover:bg-gray hover:text-primary dark:text-white dark:hover:bg-meta-4 dark:hover:text-primary"
              >
                {/* Contacts / people icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bodydark1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {t('dropdown.contacts')}
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-black transition-colors hover:bg-gray hover:text-primary dark:text-white dark:hover:bg-meta-4 dark:hover:text-primary"
              >
                {/* Settings gear icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-bodydark1">
                  <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                {t('dropdown.settings')}
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="border-t border-stroke dark:border-strokedark">
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(false);
                onLogout?.();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger/5 dark:hover:bg-danger/10"
            >
              {/* Logout icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {t('dropdown.logout')}
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
