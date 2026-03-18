import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Eye, Send, Wallet, UserPlus, ScanFace, ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import LightboxImage from '../components/LightboxImage';
import { useSalesModalStore } from '../stores/salesModalStore';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

const stepIcons = [UserPlus, ScanFace, Wallet, Send];

function Home() {
  const { t } = useTranslation();
  const openSalesModal = useSalesModalStore((state) => state.openModal);
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

  const marqueeItems = Array.from({ length: 12 }, (_, i) => t(`home.marquee.${i}`));

  const steps = stepIcons.map((icon, i) => ({
    icon,
    num: String(i + 1).padStart(2, '0'),
    title: t(`home.steps.${i}.title`),
    desc: t(`home.steps.${i}.desc`),
  }));

  const testimonials = Array.from({ length: 5 }, (_, i) => ({
    name: t(`home.testimonials.${i}.name`),
    text: t(`home.testimonials.${i}.text`),
    image: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/men/32.jpg',
      'https://randomuser.me/api/portraits/women/68.jpg',
      'https://randomuser.me/api/portraits/men/65.jpg',
      'https://randomuser.me/api/portraits/women/12.jpg',
    ][i],
  }));

  const allTestimonials = [
    ...testimonials.map((t, i) => ({ ...t, id: `a-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `b-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `c-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `d-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `e-${i}` })),
    ...testimonials.map((t, i) => ({ ...t, id: `f-${i}` })),
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight gradient-text mb-4 sm:mb-6">
                {t('home.brand')}
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                <span className="text-white">{t('home.hero.line1')}</span><br />
                <span className="gradient-text">{t('home.hero.line2')}</span><br />
                <span className="text-white">{t('home.hero.line3')}</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-neutral-400 text-lg lg:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('home.hero.description')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => window.open('https://customer.dazzlingxchange.com/', '_blank')}
                className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-neutral-950 rounded-full font-semibold text-sm sm:text-base hover:shadow-[0_0_30px_rgba(0,208,132,0.4)] transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
              >
                {t('hero.login')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={openSalesModal}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-neutral-700 text-white rounded-full font-medium text-sm sm:text-base hover:border-primary/50 hover:text-primary transition-all duration-300 w-full sm:w-auto"
              >
                {t('hero.sales')}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ─── MARQUEE TICKER ─── */}
      <section className="py-6 border-y border-neutral-800/50 overflow-hidden">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex-shrink-0 flex items-center gap-3 text-neutral-500 text-sm font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t('home.howItWorks.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-4 max-w-3xl">
              {t('home.howItWorks.title')}<br /><span className="gradient-text">{t('home.howItWorks.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}
                >
                  {/* Text side */}
                  <motion.div className="flex-1 space-y-5" variants={fadeUp} custom={0}>
                    <span className="text-7xl lg:text-8xl font-bold text-white">{step.num}</span>
                    <h3 className="text-2xl lg:text-4xl font-bold text-white -mt-4">{step.title}</h3>
                    <p className="text-neutral-400 text-lg leading-relaxed max-w-md">{step.desc}</p>
                  </motion.div>

                  {/* Visual side */}
                  <motion.div
                    className="flex-1 w-full"
                    variants={fadeUp} custom={2}
                  >
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                      {i === 0 ? (
                        <LightboxImage
                          src="https://res.cloudinary.com/dtnor59fk/image/upload/v1773818413/41a19b60-f520-4c1b-90dc-0b3b1629e0bd.png"
                          alt="Register in Minutes"
                          className="w-full h-auto object-contain rounded-2xl"
                        />
                      ) : i === 1 ? (
                        <LightboxImage
                          src="https://res.cloudinary.com/dtnor59fk/image/upload/e_enhance/91a45658-f438-458c-8de7-bf853ec061d0.png"
                          alt="Verify with ONFIDO"
                          className="w-full h-auto object-contain rounded-2xl"
                        />
                      ) : i === 2 ? (
                        <LightboxImage
                          src="https://res.cloudinary.com/dtnor59fk/image/upload/v1773820025/247f91f5-cbf9-4ee7-a89a-2214001d52b7.png"
                          alt="Unlock Your Wallet"
                          className="w-full h-auto object-contain rounded-2xl"
                        />
                      ) : (
                        <LightboxImage
                          src="https://res.cloudinary.com/dtnor59fk/image/upload/v1773820163/96b743e4-fec7-444e-8c13-480035054509.png"
                          alt="Send Money Globally"
                          className="w-full h-auto object-contain rounded-2xl"
                        />
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BENTO FEATURES ─── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 lg:px-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.span variants={fadeUp} custom={0} className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t('home.features.label')}
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-bold text-white mt-4">
              {t('home.features.title')}<br /><span className="gradient-text">{t('home.features.titleHighlight')}</span>
            </motion.h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large card — spans 2 cols */}
            <motion.div
              className="md:col-span-2 glass-card glass-card-hover rounded-3xl p-8 lg:p-10 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <Shield className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-white mb-3">{t('home.features.security.title')}</h3>
              <p className="text-neutral-400 text-base leading-relaxed max-w-lg">
                {t('home.features.security.desc')}
              </p>
            </motion.div>

            {/* Tall card */}
            <motion.div
              className="glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 min-h-[260px]"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
            >
              <Zap className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t('home.features.rates.title')}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {t('home.features.rates.desc')}
                </p>
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div
              className="glass-card glass-card-hover rounded-3xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
            >
              <Eye className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-2">{t('home.features.visibility.title')}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {t('home.features.visibility.desc')}
              </p>
            </motion.div>

            {/* Small card */}
            <motion.div
              className="glass-card glass-card-hover rounded-3xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
            >
              <Users className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-2">{t('home.features.support.title')}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {t('home.features.support.desc')}
              </p>
            </motion.div>

            {/* Wide card */}
            <motion.div
              className="glass-card glass-card-hover rounded-3xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
            >
              <Wallet className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-2">{t('home.features.payments.title')}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {t('home.features.payments.desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 relative overflow-hidden" ref={statsRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="divider-gradient mb-16" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center relative z-10">
          {[
            { value: 4, prefix: '$', suffix: 'B+', label: t('home.stats.transfers') },
            { value: 5, suffix: '★', label: t('home.stats.rating') },
            { value: 130, suffix: '+', label: t('home.stats.countries') },
            { value: 24, suffix: '/7', label: t('home.stats.support') },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                {statsInView ? (
                  <>{stat.prefix}<CountUp end={stat.value} decimals={stat.decimals ?? 0} duration={2} delay={i * 0.2} />{stat.suffix}</>
                ) : (
                  `${stat.prefix || ''}0${stat.suffix}`
                )}
              </p>
              <p className="text-neutral-500 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="divider-gradient mt-16" />
      </section>

      {/* ─── PORTAL CTA ─── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 lg:px-16">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {t('home.portal.title')}<br /><span className="gradient-text">{t('home.portal.titleHighlight')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-neutral-400 text-lg mt-6 max-w-2xl">
            {t('home.portal.description')}
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="mt-10">
            <Link
              to="/walkthrough"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-neutral-900 border border-neutral-800 text-white rounded-full font-semibold text-lg hover:border-primary/40 hover:shadow-[0_0_40px_rgba(0,208,132,0.15)] transition-all duration-300"
            >
              {t('home.portal.cta')}
              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 overflow-hidden">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white mb-16 px-6 lg:px-16 container mx-auto"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          {t('home.testimonials.title')} <span className="gradient-text">{t('home.testimonials.titleHighlight')}</span>
        </motion.h2>

        <div className="testimonial-carousel-wrapper">
          <div className="testimonial-scroll-container">
            <div className="testimonial-scroll-track">
              {allTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <img src={testimonial.image} alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mb-5 border-2 border-primary/30 mx-auto" />
                  <p className="text-neutral-300 text-base leading-relaxed mb-5 text-center italic">
                    "{testimonial.text}"
                  </p>
                  <h4 className="text-white text-sm font-semibold text-center">{testimonial.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <motion.div
          className="container mx-auto relative z-10 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl mx-auto">
            {t('home.cta.title')}<br /><span className="gradient-text">{t('home.cta.titleHighlight')}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-neutral-400 text-lg mt-6 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </motion.p>
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-10">
            <button
              onClick={() => window.open('https://customer.dazzlingxchange.com/', '_blank')}
              className="group flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 bg-primary text-neutral-950 rounded-full font-semibold text-base sm:text-lg hover:shadow-[0_0_40px_rgba(0,208,132,0.4)] transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
            >
              {t('home.cta.portal')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={openSalesModal}
              className="px-8 sm:px-10 py-4 sm:py-5 border border-neutral-700 text-white rounded-full font-medium text-base sm:text-lg hover:border-primary/50 hover:text-primary transition-all duration-300 w-full sm:w-auto"
            >
              {t('home.cta.contact')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
