import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSalesModalStore } from '../stores/salesModalStore';
import PhoneField, { PhoneValue } from './PhoneField';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { countries } from '../utils/countries';

// Function to detect country based on dial code
const getCountryFromDialCode = (dialCode: string): string => {
  // Handle various formats: "213", "+213", "213 "
  const cleanDialCode = dialCode.toString().replace(/[^0-9]/g, '');
  
  // Try to find exact match first
  let country = countries.find(c => c.dial === `+${cleanDialCode}`);
  
  // If not found, try without the '+' in case the data format is different
  if (!country) {
    country = countries.find(c => c.dial.replace('+', '') === cleanDialCode);
  }
  
  console.log('Dial code input:', dialCode, 'Cleaned:', cleanDialCode, 'Found country:', country?.name);
  return country ? country.name : `Unknown (+${cleanDialCode})`;
};

const SalesModal = () => {
  const { t } = useTranslation();
  const { open, closeModal } = useSalesModalStore();
  const [phone, setPhone] = useState<PhoneValue>({ dialCode: '+65', number: '' });
  
  // Initial form state
  const initialFormData = {
    name: '',
    email: '',
    company: '',
    message: '',
    country: '', // Keep empty initially
    date: new Date().toISOString(),
    resolved: false
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to clear/reset the form
  const clearForm = () => {
    const resetFormData = {
      ...initialFormData,
      date: new Date().toISOString(), // Update date to current
      country: '' // Keep empty on reset
    };
    setFormData(resetFormData);
    setPhone({ dialCode: '+65', number: '' }); // Reset to Singapore default
    setSubmitted(false);
    setError(null);
    console.log('Form cache cleared and reset to initial state');
  };

  // Clear form when modal opens
  useEffect(() => {
    if (open) {
      clearForm();
    }
  }, [open]);

  // Auto-update country when phone dial code changes
  useEffect(() => {
    console.log('Phone state changed:', phone);
    // Only set country if dial code is not empty
    if (phone.dialCode && phone.dialCode.trim() !== '') {
      const detectedCountry = getCountryFromDialCode(phone.dialCode);
      console.log('Setting country to:', detectedCountry);
      setFormData(prev => ({ ...prev, country: detectedCountry }));
    } else {
      // Keep country empty if no dial code is selected
      setFormData(prev => ({ ...prev, country: '' }));
    }
  }, [phone.dialCode]);

  // Simple scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeModal]);

  if (typeof document === 'undefined') return null;
  const root = document.getElementById('modal-root') ?? document.body;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const dial = phone.dialCode.startsWith('+') ? phone.dialCode : `+${phone.dialCode}`;
      const fullPhone = `${dial}${phone.number}`;
      const submissionData = {
        ...formData,
        phone: fullPhone,
        createdAt: serverTimestamp(),
        date: new Date().toISOString()
      };
      
      // Save to Firestore enquiries collection
      await addDoc(collection(db, 'enquiries'), submissionData);
      console.log('Form submission saved to Firestore');
      setSubmitted(true);
    } catch (err) {
      console.error('Error saving form submission:', err);
      setError(t('modal.sales.error'));
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Dark overlay - no blur */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            onClick={closeModal}
          />

          {/* Wrapper centers modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <motion.form
              className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 shadow-xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  clearForm();
                  closeModal();
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-neutral-700 rounded-full p-2 transition-all duration-150 z-50 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95"
                aria-label={t('modal.sales.closeAria')}
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">{t('modal.sales.thankYouTitle')}</h2>
                  <p className="text-gray-300 mb-8">{t('modal.sales.thankYouDesc')}</p>
                  <button
                    type="button"
                    onClick={() => { 
                      clearForm(); 
                      closeModal(); 
                    }}
                    className="w-full bg-brand-500 text-neutral-900 rounded-lg px-4 py-3 font-medium hover:bg-brand-600 transition-colors duration-200"
                  >
                    {t('modal.sales.close')}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-6 text-white pr-8">
                    {t('modal.sales.title')}
                  </h2>
                  {/* Form fields */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder={t('modal.sales.placeholderName')}
                      className="form-input"
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder={t('modal.sales.placeholderEmail')}
                      className="form-input"
                    />
                    <PhoneField value={phone} onChange={setPhone} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder={t('modal.sales.placeholderCompany')}
                      className="form-input"
                    />
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      placeholder={t('modal.sales.placeholderCountry')}
                      className="form-input"
                      title={t('modal.sales.countryHint')}
                    />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      placeholder={t('modal.sales.placeholderMessage')}
                      className="form-input resize-none"
                    />
                    {error && (
                      <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={clearForm}
                        className="flex-1 py-3 rounded-lg bg-neutral-700 font-medium text-white hover:bg-neutral-600 transition-colors duration-200"
                      >
                        {t('modal.sales.clear')}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-2 py-3 rounded-lg bg-brand-500 font-medium text-neutral-900 hover:bg-brand-600 transition-colors duration-200 relative disabled:opacity-70 disabled:cursor-not-allowed px-8"
                      >
                        {loading ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin inline mr-2" />
                            {t('modal.sales.submitting')}
                          </>
                        ) : (
                          t('modal.sales.submit')
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    root
  );
};

export default SalesModal;