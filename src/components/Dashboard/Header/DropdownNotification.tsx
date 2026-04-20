import React, { useState } from 'react';
import { Link } from 'react-router';
import { useT } from '@ciscode/ui-translate-core';
import DropdownShell from './DropdownShell';

type NotificationKind = 'info' | 'success' | 'warning';

interface NotificationItem {
  id: number;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

const kindStyles: Record<NotificationKind, { bg: string; icon: React.ReactNode }> = {
  info: {
    bg: 'bg-[#EEF2FF] dark:bg-primary/20',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3C50E0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-[#EEFBF3] dark:bg-success/20',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#219653"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-[#FFF8EC] dark:bg-warning/20',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFA70B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
};

const DropdownNotification: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const t = useT('templateFe');

  const notifications: NotificationItem[] = [
    {
      id: 1,
      kind: 'info',
      title: 'Profile update available',
      description: 'Your account information can be updated in settings.',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      kind: 'success',
      title: 'Invoice generated',
      description: 'Invoice #2024-001 was successfully created.',
      time: '1 hr ago',
      unread: true,
    },
    {
      id: 3,
      kind: 'warning',
      title: 'Subscription expires soon',
      description: 'Your plan expires in 7 days. Renew to avoid interruption.',
      time: 'Yesterday',
    },
    {
      id: 4,
      kind: 'info',
      title: 'New feature released',
      description: 'Check out the new dashboard widgets.',
      time: '3 days ago',
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const icon = (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  return (
    <DropdownShell
      ariaLabel="Notifications"
      badgeCount={unreadCount}
      notifying={notifying}
      onTriggerClick={() => {
        setNotifying(false);
        setDropdownOpen(!dropdownOpen);
      }}
      isOpen={dropdownOpen}
      onClose={() => setDropdownOpen(false)}
      icon={icon}
      title={t('dropdown.notifications')}
      onMarkAllRead={() => setNotifying(false)}
      footerTo="#"
      footerLabel="View all notifications"
    >
      {notifications.map(({ id, kind, title, description, time, unread }) => {
        const { bg, icon: kindIcon } = kindStyles[kind];
        return (
          <li key={id}>
            <Link
              to="#"
              className={`flex items-start gap-3 border-b border-stroke px-4 py-3 transition-colors last:border-b-0 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 ${unread ? 'bg-gray/50 dark:bg-meta-4/30' : ''}`}
            >
              <span
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}
              >
                {kindIcon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-black dark:text-white leading-snug">
                    {title}
                  </p>
                  {unread && (
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-body dark:text-bodydark line-clamp-2 leading-relaxed">
                  {description}
                </p>
                <p className="mt-1 text-[10px] text-bodydark2 dark:text-bodydark">{time}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </DropdownShell>
  );
};

export default DropdownNotification;
