import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCircle, Briefcase, BookOpen, Settings, MonitorPlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onOpenSettings: () => void;
}

function SidebarComponent({ onOpenSettings }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const links = useMemo(
    () => [
      {
        label: t('nav.home'),
        href: '/',
        icon: (
          <Home
            className={cn(
              'w-8 h-8 transition-colors duration-200',
              isActive('/')
                ? 'text-[#16d68f]'
                : 'text-white group-hover/sidebar:text-[#16d68f]'
            )}
          />
        ),
      },
      {
        label: t('nav.about'),
        href: '/about',
        icon: (
          <UserCircle
            className={cn(
              'w-8 h-8 transition-colors duration-200',
              isActive('/about')
                ? 'text-[#16d68f]'
                : 'text-white group-hover/sidebar:text-[#16d68f]'
            )}
          />
        ),
      },
      {
        label: t('nav.services'),
        href: '/services',
        icon: (
          <Briefcase
            className={cn(
              'w-8 h-8 transition-colors duration-200',
              isActive('/services')
                ? 'text-[#16d68f]'
                : 'text-white group-hover/sidebar:text-[#16d68f]'
            )}
          />
        ),
      },
      {
        label: t('nav.walkthroughMenu'),
        href: '/walkthrough',
        icon: (
          <MonitorPlay
            className={cn(
              'w-8 h-8 transition-colors duration-200',
              isActive('/walkthrough')
                ? 'text-[#16d68f]'
                : 'text-white group-hover/sidebar:text-[#16d68f]'
            )}
          />
        ),
      },
      {
        label: t('nav.articles'),
        href: '/articles',
        icon: (
          <BookOpen
            className={cn(
              'w-8 h-8 transition-colors duration-200',
              isActive('/articles') || location.pathname.startsWith('/articles/')
                ? 'text-[#16d68f]'
                : 'text-white group-hover/sidebar:text-[#16d68f]'
            )}
          />
        ),
      },
    ],
    [t, location.pathname]
  );

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-black">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-black">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-4">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div className="bg-black">
          <button
            onClick={onOpenSettings}
            className={cn(
              'flex items-center justify-start gap-2 group/sidebar py-2 w-full',
              'text-white hover:text-[#16d68f]'
            )}
          >
            <Settings className="w-8 h-8 transition-colors duration-200 group-hover/sidebar:text-[#16d68f]" />
            <motion.span
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
              {t('settings.title')}
            </motion.span>
          </button>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

// Logo components
const Logo = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-3 items-center text-sm text-white py-1 relative z-20"
    >
      <img 
        src="https://i.ibb.co/VcB3xpz1/Untitled-design-2025-07-02-T031441-104.png" 
        alt="Dazzling Xchange Logo" 
        className="w-14 h-14 object-contain flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre text-lg"
      >
        Dazzling Xchange
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <img 
        src="https://i.ibb.co/VcB3xpz1/Untitled-design-2025-07-02-T031441-104.png" 
        alt="Dazzling Xchange Logo" 
        className="w-14 h-14 object-contain flex-shrink-0"
      />
    </Link>
  );
};

export default SidebarComponent;