import React from 'react';
import LightboxImage from '../components/LightboxImage';
import { useTranslation } from 'react-i18next';
import { Shield, Zap, Users, Globe, ChevronDown } from 'lucide-react';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const valueIcons = [Shield, Zap, Users, Globe];

function About() {
  const { t } = useTranslation();
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const valueKeys = ['security', 'technology', 'customerFirst', 'global'];
  const values = valueKeys.map((key, i) => ({
    icon: valueIcons[i],
    title: t(`about.values.${key}.title`),
    desc: t(`about.values.${key}.desc`),
  }));

  return (
    <div className="bg-black min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative pt-8 sm:pt-20 px-4 sm:px-6 lg:px-16 overflow-visible pb-16 sm:pb-32">
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Content */}
            <div className="pt-8 lg:pt-16">
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30 text-primary bg-primary/5 mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              >
                {t('about.hero.badge')}
              </motion.span>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              >
                <span className="text-white">{t('about.hero.line1')}</span><br />
                <span className="text-white">{t('about.hero.line2')} </span>
                <span className="gradient-text">{t('about.hero.line2Highlight')}</span>
              </motion.h1>

              <motion.p
                className="text-neutral-400 text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              >
                {t('about.hero.description')}
              </motion.p>

              <motion.div
                className="mt-10 flex"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
              </motion.div>
            </div>

            {/* Right — Visual card that overlaps into next section */}
            <motion.div
              className="relative self-start pt-8 lg:pt-16"
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/[0.03] rounded-[2rem] blur-3xl group-hover:bg-primary/[0.06] transition-opacity duration-700 pointer-events-none" />
                <LightboxImage
                  src="https://res.cloudinary.com/dtnor59fk/image/upload/v1773820163/96b743e4-fec7-444e-8c13-480035054509.png"
                  alt="Dazzling Xchange"
                  className="w-full max-h-[420px] object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="pt-8 pb-28 px-6 lg:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              className="space-y-8"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
                {t('about.mission.label')}
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white">
                {t('about.mission.title')} <span className="gradient-text">{t('about.mission.titleHighlight')}</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-neutral-400 text-lg lg:text-xl leading-loose">
                {t('about.mission.p1')}
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="text-neutral-400 text-lg lg:text-xl leading-loose">
                {t('about.mission.p2.start')} <span className="text-primary font-medium">{t('about.mission.p2.highlight')}</span>
              </motion.p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {[
                { value: t('about.mission.stats.countries.value'), label: t('about.mission.stats.countries') },
                { value: t('about.mission.stats.currencies.value'), label: t('about.mission.stats.currencies') },
                { value: t('about.mission.stats.support.value'), label: t('about.mission.stats.support') },
                { value: t('about.mission.stats.uptime.value'), label: t('about.mission.stats.uptime') },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp} custom={i}
                  className="glass-card glass-card-hover rounded-2xl p-6 text-center transition-all duration-300"
                >
                  <p className="text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-neutral-500 text-sm mt-1 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="py-20 relative" ref={statsRef}>
        <div className="divider-gradient mb-16" />
        <div className="max-w-6xl mx-auto px-6">
          <motion.span
            className="text-primary text-sm font-semibold tracking-widest uppercase"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {t('about.metrics.label')}
          </motion.span>
          <motion.h2
            className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            {t('about.metrics.title')} <span className="gradient-text">{t('about.metrics.titleHighlight')}</span>
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 204, prefix: '£', suffix: 'M', label: t('about.metrics.revenue.label') },
              { value: 1000000, suffix: '+', label: t('about.metrics.transfers.label') },
              { value: 20000, suffix: '+', label: t('about.metrics.customers.label') },
              { value: 1600, suffix: '+', label: t('about.metrics.team.label') },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="py-4"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              >
                <p className="text-3xl lg:text-5xl font-bold text-white">
                  {statsInView ? (
                    <>{stat.prefix}<CountUp end={stat.value} duration={2.5} separator="," delay={i * 0.2} />{stat.suffix}</>
                  ) : `${stat.prefix || ''}0${stat.suffix}`}
                </p>
                <p className="text-neutral-500 text-sm mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="divider-gradient mt-16" />
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-28 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t('about.values.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl lg:text-5xl font-bold text-white mt-4">
              {t('about.values.title')} <span className="gradient-text">{t('about.values.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          {/* Bento-style values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((val, i) => {
              const Icon = val.icon;
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  key={val.title}
                  className={`glass-card glass-card-hover rounded-3xl p-8 lg:p-10 transition-all duration-300 ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                >
                  <Icon className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
