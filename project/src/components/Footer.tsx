import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SUPPORT_EMAIL = 'support@zentara.com';
const SUPPORT_PHONE_TEL = '+6581584855';
const SUPPORT_PHONE_DISPLAY = '+6581584855';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white pt-12 pb-8 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top row: links & blurb */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Company */}
          <div>
            <h4 className="text-[#16d68f] font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="footer-link">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  {t('footer.services')}
                </Link>
              </li>
              <li>
                <Link to="/walkthrough" className="footer-link">
                  {t('footer.walkthrough')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <h4 className="text-[#16d68f] font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="footer-link block break-all"
                >
                  <span className="text-gray-500 text-sm block">{t('footer.email')}</span>
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${SUPPORT_PHONE_TEL}`} className="footer-link block">
                  <span className="text-gray-500 text-sm block">{t('footer.phone')}</span>
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Blurb */}
          <div>
            <p className="text-[#16d68f] font-medium leading-relaxed">
              {t('footer.blurb')}
            </p>
          </div>
        </div>

        {/* Middle row: copyright & license */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {t('footer.address')}
          </p>
        </div>

        {/* Bottom row: legal & long disclaimer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: long legal disclaimer */}
          <div className="text-gray-500 text-xs space-y-4 max-h-40 overflow-y-auto">
            <p>
              {t('footer.disclaimer1')}
            </p>
            <p>
              {t('footer.disclaimer2')}
            </p>
          </div>

          {/* Right: Terms & Privacy */}
          <div className="flex items-start justify-start lg:justify-end space-x-8">
            <Link to="/terms" className="footer-link text-sm">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="footer-link text-sm">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;