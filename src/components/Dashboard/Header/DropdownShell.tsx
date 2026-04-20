import React, { type ReactNode } from 'react';
import { Link } from 'react-router';
import ClickOutside from '../ClickOutside';

export interface DropdownShellProps {
  /** aria-label for the trigger button */
  ariaLabel: string;
  /** Badge count – shown when notifying is true */
  badgeCount: number;
  /** Whether the badge/dot is visible */
  notifying: boolean;
  /** Called when the trigger button is clicked */
  onTriggerClick: () => void;
  /** Whether the panel is open */
  isOpen: boolean;
  /** Called to close the panel (click-outside) */
  onClose: () => void;
  /** SVG icon rendered inside the trigger button */
  icon: ReactNode;
  /** Panel heading text */
  title: string;
  /** Called when "Mark all read" is clicked */
  onMarkAllRead: () => void;
  /** href for the footer "View all" link */
  footerTo: string;
  /** Label for the footer "View all" link */
  footerLabel: string;
  /** Tailwind width class for the panel (default: 'w-80') */
  panelWidth?: string;
  /** List items rendered inside the scrollable area */
  children: ReactNode;
}

const TRIGGER_BTN_CN =
  'relative flex h-9 w-9 items-center justify-center rounded-xl border border-stroke bg-white text-bodydark1 shadow-sm transition-colors hover:border-primary hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:hover:border-primary dark:hover:text-primary';

const PANEL_CN =
  'absolute z-[9999] mt-2 flex flex-col rounded-xl border-[1.5px] border-stroke bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:border-strokedark dark:bg-boxdark dark:shadow-[0_8px_32px_rgba(0,0,0,0.40)] ltr:right-0 rtl:left-0';

/** Shared dropdown shell used by DropdownMessage and DropdownNotification */
const DropdownShell: React.FC<DropdownShellProps> = ({
  ariaLabel,
  badgeCount,
  notifying,
  onTriggerClick,
  isOpen,
  onClose,
  icon,
  title,
  onMarkAllRead,
  footerTo,
  footerLabel,
  panelWidth = 'w-80',
  children,
}) => (
  <ClickOutside onClick={onClose} className="relative">
    <li className="relative">
      <button
        type="button"
        onClick={onTriggerClick}
        className={TRIGGER_BTN_CN}
        aria-label={ariaLabel}
      >
        {notifying && (
          <span className="absolute -top-0.5 ltr:-right-0.5 rtl:-left-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
            {badgeCount}
          </span>
        )}
        {icon}
      </button>

      {isOpen && (
        <div className={`${PANEL_CN} ${panelWidth}`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stroke px-4 py-3 dark:border-strokedark">
            <div>
              <h5 className="text-sm font-semibold text-black dark:text-white">{title}</h5>
              {notifying && (
                <p className="text-xs text-body dark:text-bodydark">{badgeCount} unread</p>
              )}
            </div>
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-xs font-medium text-primary hover:underline"
            >
              Mark all read
            </button>
          </div>

          {/* List */}
          <ul className="flex max-h-72 flex-col overflow-y-auto">{children}</ul>

          {/* Footer */}
          <Link
            to={footerTo}
            className="flex items-center justify-center gap-1.5 border-t border-stroke py-3 text-xs font-medium text-primary transition-colors hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4"
          >
            {footerLabel}
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

export default DropdownShell;
