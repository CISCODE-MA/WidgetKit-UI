import { useState } from 'react';
import ClickOutside from '../ClickOutside';
import React from 'react';
import { Link } from 'react-router';
import { useT } from '@ciscode/ui-translate-core';

type DropdownUserProps = {
  onLogout?: () => void;
};

const DropdownUser: React.FC<DropdownUserProps> = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = useT('templateFe');
  const role = 'superAdmin'; // or from user data
  const translatedRole = t(`roles.${role}`, { defaultValue: role });
  console.log('DROPDOWN RENDER onLogout =', onLogout);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden lg:block ltr:text-right rtl:text-left">
          <span className="block text-sm font-medium text-black dark:text-white">Thomas Anree</span>
          <span className="block text-xs">{translatedRole}</span>
        </span>

        <span className="h-12 w-12">
          <img
            className="rounded-full"
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1746791582~exp=1746795182~hmac=309f4f17836c810c90c28cdb6f2e1503a0298aaf7d37c748cae051e32a33a927&w=740"
            alt="User"
          />
        </span>

        {/* Chevron (valid SVG) */}
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div className="absolute mt-4 ltr:right-0 rtl:left-0 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setDropdownOpen(false)}
              >
                {/* placeholder icon to keep alignment */}
                <span className="w-[22px]" />
                {t('dropdown.profile')}
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <span className="w-[22px]" />
                {t('dropdown.contacts')}
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="w-[22px]" />
                {t('dropdown.settings')}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => {
              console.log('DROPDOWN LOGOUT CLICKED, onLogout =', onLogout);
              setDropdownOpen(false);
              onLogout?.();
            }}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          >
            <span className="w-[22px]" />
            {t('dropdown.logout')}
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
