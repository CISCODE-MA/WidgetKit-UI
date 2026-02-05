import React, { useState, ReactNode } from 'react';
import Header from '../components/Dashboard/Header/index';
import Sidebar from '../components/Dashboard/Sidebar/index';
import { SidebarSection } from '../models/SidebarItemModel';

type FooterLink = {
  label: string;
  href: string;
  newTab?: boolean;
};

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarContent: SidebarSection[];
  logo: ReactNode;
  onLogout?: () => void;

  footer?: {
    /**
     * Advanced: fully custom footer blocks (you control the JSX).
     */
    blocks?: ReactNode[];
    /**
     * Simple preset: provide data only, template renders a styled footer.
     */
    preset?: {
      leftText: string;
      links?: FooterLink[];
      version?: string;
    };
    /**
     * Optional className override on the <footer> wrapper.
     */
    className?: string;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarContent,
  logo,
  onLogout,
  footer,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hasPreset = Boolean(footer?.preset);
  const hasBlocks = Boolean(footer?.blocks && footer.blocks.length > 0);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark ltr:font-sans rtl:font-sans rtl:direction-rtl">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sections={sidebarContent}
          logo={logo}
        />

        {/* Main content column */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={onLogout} />

          <div className="flex min-h-0 flex-1 flex-col">
            {/* Content */}
            <main className="flex-1">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
            </main>

            {/* Sticky footer (preset has priority over blocks) */}
            {hasPreset ? (
              <footer className={['ciscod-footer', footer?.className ?? ''].join(' ')}>
                <div className="ciscod-footer__inner">
                  <div className="ciscod-footer__content">
                    <div className="ciscod-footer__left">{footer?.preset?.leftText}</div>

                    <div className="ciscod-footer__right">
                      {footer?.preset?.links?.length ? (
                        <div className="ciscod-footer__links">
                          {footer.preset.links.map((l) => {
                            const newTab = l.newTab ?? true; // default: new tab
                            return (
                              <a
                                key={`${l.label}-${l.href}`}
                                href={l.href}
                                target={newTab ? '_blank' : undefined}
                                rel={newTab ? 'noreferrer' : undefined}
                              >
                                {l.label}
                              </a>
                            );
                          })}
                        </div>
                      ) : null}

                      {footer?.preset?.version ? (
                        <span className="ciscod-footer__version">{footer.preset.version}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </footer>
            ) : hasBlocks ? (
              <footer className={['ciscod-footer', footer?.className ?? ''].join(' ')}>
                <div className="ciscod-footer__inner">
                  <div className="ciscod-footer__content">
                    {footer!.blocks!.map((block, idx) => (
                      <React.Fragment key={idx}>{block}</React.Fragment>
                    ))}
                  </div>
                </div>
              </footer>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
