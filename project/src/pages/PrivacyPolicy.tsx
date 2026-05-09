import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

function PrivacyPolicy() {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const list = (key: string) =>
    t(key)
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);

  return (
    <div ref={containerRef} className="bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 lg:px-24">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#A0A0A0] text-sm font-normal font-primary mb-4">
            ZENTARA - Powered by DAZZLINGXCHANGE
          </p>

          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium font-primary">{t('legal.privacy.back')}</span>
          </Link>

          <div className="flex items-center mb-6">
            <Shield className="w-12 h-12 text-primary mr-4" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
                {t('legal.privacy.title')}
              </h1>
              <p className="text-neutral-400 font-primary mt-2">{t('legal.privacy.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center text-neutral-500 text-sm font-primary">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t('legal.privacy.updated')}</span>
          </div>
        </motion.div>

        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-neutral-300 font-primary leading-relaxed space-y-8">
            <p>{t('legal.privacy.intro')}</p>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s1.title')}</h2>
              <p className="mb-4">{t('legal.privacy.s1.lead')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {list('legal.privacy.s1.items').map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s2.title')}</h2>
              <p className="mb-4">{t('legal.privacy.s2.lead')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {list('legal.privacy.s2.items').map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s3.title')}</h2>
              <p>{t('legal.privacy.s3.body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s4.title')}</h2>
              <p>{t('legal.privacy.s4.body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s5.title')}</h2>
              <p>{t('legal.privacy.s5.body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s6.title')}</h2>
              <p>{t('legal.privacy.s6.body')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-secondary font-primary mb-4">{t('legal.privacy.s7.title')}</h2>
              <p>{t('legal.privacy.s7.body')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
