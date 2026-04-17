import React, { useState } from 'react';
import ClickOutside from '../ClickOutside';
import { Link } from 'react-router';
import { useT } from '@ciscode/ui-translate-core';

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

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <button
          type="button"
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-stroke bg-white text-bodydark1 shadow-sm transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:hover:border-primary dark:hover:text-primary"
          aria-label="Notifications"
        >
          {notifying && (
            <span className="absolute -top-0.5 ltr:-right-0.5 rtl:-left-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
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
        </button>

        {dropdownOpen && (
          <div className="absolute z-[9999] mt-2 flex w-80 flex-col rounded-xl border-[1.5px] border-stroke bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-strokedark dark:bg-boxdark dark:shadow-[0_8px_32px_rgba(0,0,0,0.40)] ltr:right-0 rtl:left-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stroke px-4 py-3 dark:border-strokedark">
              <div>
                <h5 className="text-sm font-semibold text-black dark:text-white">
                  {t('dropdown.notifications')}
                </h5>
                {notifying && (
                  <p className="text-xs text-body dark:text-bodydark">{unreadCount} unread</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setNotifying(false)}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all read
              </button>
            </div>

            {/* List */}
            <ul className="flex max-h-72 flex-col overflow-y-auto">
              {notifications.map(({ id, kind, title, description, time, unread }) => {
                const { bg, icon } = kindStyles[kind];
                return (
                  <li key={id}>
                    <Link
                      to="#"
                      className={`flex items-start gap-3 border-b border-stroke px-4 py-3 transition-colors last:border-b-0 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 ${unread ? 'bg-gray/50 dark:bg-meta-4/30' : ''}`}
                    >
                      {/* Kind icon */}
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}
                      >
                        {icon}
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
            </ul>

            {/* Footer */}
            <Link
              to="#"
              className="flex items-center justify-center gap-1.5 border-t border-stroke py-3 text-xs font-medium text-primary transition-colors hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4"
            >
              View all notifications
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
