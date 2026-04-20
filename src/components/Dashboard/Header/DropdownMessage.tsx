import React, { useState } from 'react';
import { Link } from 'react-router';
import { useT } from '@ciscode/ui-translate-core';
import { getInitials, pickGradient } from './avatarUtils';
import DropdownShell from './DropdownShell';

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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  return (
    <DropdownShell
      ariaLabel="Messages"
      badgeCount={unreadCount}
      notifying={notifying}
      onTriggerClick={() => {
        setNotifying(false);
        setDropdownOpen(!dropdownOpen);
      }}
      isOpen={dropdownOpen}
      onClose={() => setDropdownOpen(false)}
      icon={icon}
      title={t('dropdown.messages')}
      onMarkAllRead={() => setNotifying(false)}
      footerTo="/messages"
      footerLabel="View all messages"
    >
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
    </DropdownShell>
  );
};

export default DropdownMessage;
