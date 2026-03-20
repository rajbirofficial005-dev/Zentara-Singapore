import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

function TermsOfUse() {
  const { t } = useTranslation();

  const sections = [1, 2, 3, 4, 5, 6] as const;

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 lg:px-24">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-accent transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium font-primary">{t('legal.terms.back')}</span>
          </Link>

          <div className="flex items-center mb-6">
            <FileText className="w-12 h-12 text-primary mr-4" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary">
                {t('legal.terms.title')}
              </h1>
              <p className="text-neutral-400 font-primary mt-2">{t('legal.terms.subtitle')}</p>
            </div>
          </div>

          <div className="flex items-center text-neutral-500 text-sm font-primary">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t('legal.terms.updated')}</span>
          </div>
        </motion.div>

        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-neutral-300 font-primary leading-relaxed space-y-8">
            <p>{t('legal.terms.intro')}</p>

            {sections.map((n) => (
              <div key={n}>
                <h2 className="text-2xl font-bold text-secondary font-primary mb-4">
                  {t(`legal.terms.s${n}.title`)}
                </h2>
                <p>{t(`legal.terms.s${n}.body`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default TermsOfUse;
