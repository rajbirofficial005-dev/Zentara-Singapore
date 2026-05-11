import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Smartphone, ScanFace, Wallet, Send, BarChart3, Users, Building, CreditCard, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer';
import LightboxImage from '../components/LightboxImage';
import ComingSoonModal from '../components/ComingSoonModal';
import { useSalesModalStore } from '../stores/salesModalStore';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const stepIcons = [Smartphone, ScanFace, Wallet, Send];

function Services() {
  const { t } = useTranslation();
  const openSalesModal = useSalesModalStore((state) => state.openModal);
  const [activePayment, setActivePayment] = useState<'bank' | 'wallet'>('bank');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const paymentMethods = {
    bank: {
      title: t('services.payment.bank.title'),
      icon: Building,
      features: [
        t('services.payment.bank.f1'),
        t('services.payment.bank.f2'),
        t('services.payment.bank.f3'),
        t('services.payment.bank.f4'),
        t('services.payment.bank.f5'),
      ],
      highlight: t('services.payment.bank.highlight'),
    },
    wallet: {
      title: t('services.payment.wallet.title'),
      icon: CreditCard,
      features: [
        t('services.payment.wallet.f1'),
        t('services.payment.wallet.f2'),
        t('services.payment.wallet.f3'),
        t('services.payment.wallet.f4'),
        t('services.payment.wallet.f5'),
      ],
      highlight: t('services.payment.wallet.highlight'),
    },
  };

  const active = paymentMethods[activePayment];
  const ActiveIcon = active.icon;

  const journeySteps = stepIcons.map((icon, i) => ({
    icon,
    num: String(i + 1).padStart(2, '0'),
    title: t(`services.journey.step${i + 1}.title`),
    desc: t(`services.journey.step${i + 1}.desc`),
  }));

  return (
    <div className="bg-black min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative pt-8 sm:pt-20 px-4 sm:px-6 lg:px-16 overflow-visible pb-16 sm:pb-32">
        <div className="absolute top-10 -right-40 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Content */}
            <div className="pt-8 lg:pt-16">
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30 text-primary bg-primary/5 mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              >
                {t('services.hero.badge')}
              </motion.span>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              >
                <span className="text-white">{t('services.hero.line1')}</span><br />
                <span className="gradient-text">{t('services.hero.line1Highlight')}</span>
              </motion.h1>

              <motion.p
                className="text-neutral-400 text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                {t('services.hero.description')}
              </motion.p>

              <motion.div
                className="mt-10 flex"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
              </motion.div>
            </div>

            {/* Right — Image */}
            <motion.div
              className="relative self-start pt-8 lg:pt-16 flex justify-center"
              style={{ maxWidth: 380 }}
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="phone-frame">
                <LightboxImage
                  src="/images/walkthrough/head.jpeg"
                  alt="Our Services"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE JOURNEY ─── */}
      <section className="pt-36 pb-20 px-6 lg:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t('services.journey.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-bold text-white mt-4">
              {t('services.journey.title')} <span className="gradient-text">{t('services.journey.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          {/* Steps — vertical timeline */}
          <div className="relative">
            <div className="hidden lg:block absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            <div className="space-y-8 lg:space-y-0">
              {journeySteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    className="relative flex gap-6 lg:gap-10 items-start group lg:py-10"
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.6 }} viewport={{ once: true }}
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-neutral-800 group-hover:border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,208,132,0.15)]">
                        <Icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex-1 glass-card rounded-2xl p-8 group-hover:border-primary/20 transition-all duration-300 min-h-[140px]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl lg:text-2xl font-bold text-white">{step.title}</h3>
                        <span className="text-4xl lg:text-5xl font-bold text-white group-hover:text-primary transition-colors duration-300">{step.num}</span>
                      </div>
                      <p className="text-neutral-400 text-base leading-relaxed max-w-xl">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PAYMENT METHODS ─── */}
      <section className="py-28 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div className="mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t('services.payment.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-bold text-white mt-4">
              {t('services.payment.title')} <span className="gradient-text">{t('services.payment.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          <div className="flex gap-2 mb-10">
            {(['bank', 'wallet'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActivePayment(key)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activePayment === key
                    ? 'bg-primary text-neutral-950'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {paymentMethods[key].title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePayment}
              className="glass-card rounded-3xl p-8 lg:p-12"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <ActiveIcon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{active.title}</h3>
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mt-1">
                      {active.highlight}
                    </span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {active.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-neutral-300 text-base">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── MANAGEMENT FEATURES ─── */}
      <section className="py-28 px-6 lg:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
                {t('services.capabilities.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-bold text-white mt-4">
              {t('services.capabilities.title')} <span className="gradient-text">{t('services.capabilities.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Receiver Management */}
            <motion.div
              className="space-y-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} custom={0}>
                <Users className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{t('services.capabilities.receivers.title')}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t('services.capabilities.receivers.desc')}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {t('services.capabilities.receivers.tags').split(',').map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Transaction Tracking */}
            <motion.div
              className="space-y-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} custom={1}>
                <BarChart3 className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{t('services.capabilities.tracking.title')}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t('services.capabilities.tracking.desc')}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {t('services.capabilities.tracking.tags').split(',').map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Wallet Management */}
            <motion.div
              className="space-y-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} custom={2}>
                <Wallet className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{t('services.capabilities.wallet.title')}</h3>
                <p className="text-neutral-400 leading-relaxed">
                  {t('services.capabilities.wallet.desc')}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {t('services.capabilities.wallet.tags').split(',').map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <motion.div
          className="container mx-auto relative z-10 flex flex-col items-center text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
            {t('services.cta.heading')} <span className="gradient-text">{t('services.cta.headingHighlight')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-neutral-400 text-lg mt-6 max-w-2xl">
            {t('services.cta.description')}
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4 mt-10">
            <button
              onClick={() => setIsComingSoonOpen(true)}
              className="group flex items-center gap-2 px-10 py-5 bg-primary text-neutral-950 rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(0,208,132,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              {t('services.cta.portal')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openSalesModal}
              className="px-10 py-5 border border-neutral-700 text-white rounded-full font-medium text-lg hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              {t('services.cta.contactBtn')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
      <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />
    </div>
  );
}

export default Services;
