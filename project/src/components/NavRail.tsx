import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCircle, Briefcase, BookOpen, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SHOW_ARTICLES_IN_NAV } from '../config/navigation';

interface NavRailProps {
  onOpenSettings: () => void;
}

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
}

const navItemsAll: NavItem[] = [
  { path: '/', icon: Home, label: 'nav.home', title: 'nav.home' },
  { path: '/services', icon: Briefcase, label: 'nav.services', title: 'nav.services' },
  { path: '/about', icon: UserCircle, label: 'nav.about', title: 'nav.about' },
  { path: '/articles', icon: BookOpen, label: 'nav.articles', title: 'nav.articles' },
];

const navItems = SHOW_ARTICLES_IN_NAV
  ? navItemsAll
  : navItemsAll.filter((item) => item.path !== '/articles');

const NavRail: React.FC<NavRailProps> = React.memo(({ onOpenSettings }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/articles') {
      return location.pathname === path || location.pathname.startsWith('/articles/');
    }
    return location.pathname === path;
  };

  const navItemVariants = {
    initial: { width: 48 },
    hover: { width: 'auto' },
    exit: { width: 48 }
  };

  const labelVariants = {
    initial: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <>
      {/* Desktop NavRail */}
      <motion.aside 
        className="fixed left-0 top-0 h-screen bg-neutral-950 flex flex-col justify-between items-start py-6 z-50 hidden lg:flex shadow-xl border-r border-neutral-800"
        initial={{ width: 80 }}
        whileHover={{ width: 'auto' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <nav className="flex flex-col items-start space-y-2 mt-8 w-full px-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            
            return (
              <motion.div
                key={item.path}
                variants={navItemVariants}
                initial="initial"
                whileHover="hover"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onHoverStart={() => setHoveredItem(item.path)}
                onHoverEnd={() => setHoveredItem(null)}
                className="w-full"
              >
                <Link
                  to={item.path}
                  className={`
                    flex items-center h-12 px-3 rounded-lg transition-colors duration-200 
                    group relative overflow-hidden whitespace-nowrap
                    ${active 
                      ? 'bg-primary text-neutral-900 shadow-glow-primary' 
                      : 'text-neutral-400 hover:text-primary hover:bg-neutral-800'
                    }
                  `}
                  title={t(item.title)}
                  aria-label={t(item.title)}
                >
                  <IconComponent 
                    className={`w-6 h-6 flex-shrink-0 transition-colors duration-200`} 
                  />
                  
                  <AnimatePresence>
                    {hoveredItem === item.path && (
                      <motion.span
                        variants={labelVariants}
                        initial="initial"
                        animate="hover"
                        exit="exit"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="ml-3 font-medium"
                      >
                        {t(item.label)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex flex-col items-start space-y-4 w-full px-4">
          {/* Settings Button */}
          <motion.div
            variants={navItemVariants}
            initial="initial"
            whileHover="hover"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onHoverStart={() => setHoveredItem('settings')}
            onHoverEnd={() => setHoveredItem(null)}
            className="w-full"
          >
            <button
              onClick={onOpenSettings}
              className="flex items-center h-12 px-3 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-800 transition-colors duration-200 group relative overflow-hidden whitespace-nowrap w-full"
              title={t('settings.language')}
              aria-label={t('settings.language')}
            >
              <Settings className="w-6 h-6 flex-shrink-0 transition-colors duration-200" />
              
              <AnimatePresence>
                {hoveredItem === 'settings' && (
                  <motion.span
                    variants={labelVariants}
                    initial="initial"
                    animate="hover"
                    exit="exit"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="ml-3 font-medium"
                  >
                    {t('settings.language')}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Company Logo */}
          <Link 
            to="/"
            className="flex items-center justify-center w-12 h-12 mx-auto rounded-lg hover:bg-neutral-800 transition-colors duration-200 group"
            title={t('nav.home')}
            aria-label={t('nav.logoAria')}
          >
            <img 
              src="/zentara-logo.png" 
              alt="Zentara Logo" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </motion.aside>
      
      {/* Mobile Bottom Navigation */}
      <aside className="fixed left-0 bottom-0 w-full h-16 bg-neutral-950 flex justify-around items-center py-2 z-50 lg:hidden border-t border-neutral-800 shadow-lg">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center h-12 px-2 rounded-lg transition-colors duration-200
                ${active 
                  ? 'text-primary' 
                  : 'text-neutral-400 hover:text-primary'
                }
              `}
              aria-label={t(item.title)}
            >
              <IconComponent className="w-6 h-6 transition-colors duration-200" />
            </Link>
          );
        })}
        
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center h-12 px-2 rounded-lg text-neutral-400 hover:text-primary transition-colors duration-200"
          aria-label={t('nav.settingsAria')}
        >
          <Settings className="w-6 h-6 transition-colors duration-200" />
        </button>
      </aside>
    </>
  );
});

NavRail.displayName = 'NavRail';

export default NavRail;