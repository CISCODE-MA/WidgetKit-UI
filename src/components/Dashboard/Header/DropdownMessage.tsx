import React, { useState } from 'react';
import { Link } from 'react-router';
import ClickOutside from '../ClickOutside';
import { useT } from '@ciscode/ui-translate-core';
import { getInitials, pickGradient } from './avatarUtils';

interface MessageItem {
  id: number;
  user: string;
  text: string;
  time: string;
  unread?: boolean;
  online?: boolean;
}

/** Generates a deterministic gradient + initials avatar from a name */
const InitialsAvatar: React.FC<{ name: string; online?: boolean }> = ({ name, online }) => {
  const initials = getInitials(name);
  const gradient = pickGradient(name);

  return (
    <div className="relative shrink-0">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-semibold text-white`}
      >
        {initials}
      </span>
      {online && (
        <span className="absolute bottom-0 ltr:right-0 rtl:left-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success dark:border-boxdark" />
      )}
    </div>
  );
};

const DropdownMessage: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const t = useT('templateFe');

  const messages: MessageItem[] = [
    {
      id: 1,
      user: 'Mariya Desoja',
      text: 'I like your confidence 💪',
      time: '2 min ago',
      unread: true,
      online: true,
    },
    {
      id: 2,
      user: 'Robert John',
      text: 'Can you share your offer?',
      time: '10 min ago',
      unread: true,
    },
    {
      id: 3,
      user: 'Henry Dholi',
      text: 'I came across your profile and...',
      time: '1 day ago',
      online: true,
    },
    { id: 4, user: 'Cody Fisher', text: "I'm waiting for your response!", time: '5 days ago' },
  ];

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li className="relative">
        <button
          type="button"
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-stroke bg-white text-bodydark1 shadow-sm transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:hover:border-primary dark:hover:text-primary"
          aria-label="Messages"
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-[9999] mt-2 flex w-80 flex-col rounded-xl border-[1.5px] border-stroke bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-strokedark dark:bg-boxdark dark:shadow-[0_8px_32px_rgba(0,0,0,0.40)] ltr:right-0 rtl:left-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stroke px-4 py-3 dark:border-strokedark">
              <div>
                <h5 className="text-sm font-semibold text-black dark:text-white">
                  {t('dropdown.messages')}
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

            {/* Messages list */}
            <ul className="flex max-h-72 flex-col overflow-y-auto">
              {messages.map(({ id, user, text, time, unread, online }) => (
                <li key={id}>
                  <Link
                    to="/messages"
                    className={`flex items-center gap-3 border-b border-stroke px-4 py-3 transition-colors last:border-b-0 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 ${
                      unread ? 'bg-gray/50 dark:bg-meta-4/30' : ''
                    }`}
                  >
                    <InitialsAvatar name={user} online={online} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-black dark:text-white truncate">
                          {user}
                        </p>
                        <span className="shrink-0 text-[10px] text-bodydark2">{time}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-body dark:text-bodydark truncate">{text}</p>
                    </div>

                    {unread && <span className="ml-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <Link
              to="/messages"
              className="flex items-center justify-center gap-1.5 border-t border-stroke py-3 text-xs font-medium text-primary transition-colors hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4"
            >
              View all messages
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

export default DropdownMessage;
