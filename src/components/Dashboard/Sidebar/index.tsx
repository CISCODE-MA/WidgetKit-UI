import type { JSX } from 'react';
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useLocation, NavLink } from 'react-router';
import { SidebarSection } from '../../../models/SidebarItemModel';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  sections: SidebarSection[];
  logo?: ReactNode;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, sections, logo }: SidebarProps): JSX.Element => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState<boolean>(storedSidebarExpanded === 'true');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(e.target as Node) ||
        trigger.current.contains(e.target as Node)
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (!sidebarOpen || e.key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const sortedSections = [...sections].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden
        bg-black duration-300 ease-linear dark:bg-boxdark
        w-[min(290px,85vw)] lg:w-[290px]
        lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-center px-6 py-6">
        <NavLink to="/">
          {logo ? (
            <span className="contents">{logo}</span>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-semibold tracking-wide">
              APP-LOGO
            </div>
          )}
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="ml-3 block lg:hidden"
        >
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18">
            <path d="M19 8.175H2.98748L9.36248 1.6875..." />
          </svg>
        </button>
      </div>
      {/* END SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {sortedSections.map((section) => {
            const sortedItems = [...section.items].sort(
              (a, b) => (a.order ?? 9999) - (b.order ?? 9999),
            );

            return (
              <div key={section.name}>
                <h3 className="mb-4 ltr:ml-4 rtl:mr-4 text-sm font-semibold text-bodydark2">
                  {section.name.toUpperCase()}
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {sortedItems.map((item) => {
                    const isActive = pathname.includes(item.path ?? '');
                    return (
                      <li key={item.label}>
                        <NavLink
                          to={item.path ?? '#'}
                          className={`group relative flex items-center gap-2.5
                            rounded-sm py-2 px-4 font-medium text-white
                            duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                            ${isActive && 'bg-graydark dark:bg-meta-4'}
                          `}
                        >
                          {item.icon && <span className="fill-current">{item.icon}</span>}
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
