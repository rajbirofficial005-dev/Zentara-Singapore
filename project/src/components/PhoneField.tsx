import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { countries, type Country } from '../utils/countries';

/* ---------- Types ---------- */
export interface PhoneValue {
  dialCode: string;   // "+61"
  number: string;     // "412345678"
}

interface Props {
  value: PhoneValue;
  onChange: (v: PhoneValue) => void;
}
/* ---------- Component ---------- */
const PhoneField: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Memoize filtered countries to avoid recalculating on every render
  const filteredCountries = useMemo(() => 
    countries.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
    ), [search]
  );

  // Memoize selected country
  const selectedCountry = useMemo(() => {
    if (!value.dialCode || value.dialCode.trim() === '') {
      return null; // No country selected
    }
    return countries.find(c => c.dial === value.dialCode) || countries[0];
  }, [value.dialCode]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleCountrySelect = useCallback((c: Country) => {
    onChange({ ...value, dialCode: c.dial });
    setDropdownOpen(false);
    setSearch('');
  }, [value, onChange]);

  const handleNum = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, number: e.target.value.replace(/\D/g, '') });
  }, [value, onChange]);

  return (
    <div className="flex gap-3 flex-col sm:flex-row">
      {/* Country select dropdown */}
      <div className="relative sm:w-28 w-full">
        <div
          className="flex items-center bg-[#23272a] border border-[#374151] rounded-lg px-3 py-2 cursor-pointer select-none"
          onClick={() => setDropdownOpen(v => !v)}
        >
          {selectedCountry ? (
            <>
              <span className="text-white">{selectedCountry.dial}</span>
              <span className="ml-2 text-white font-semibold">{selectedCountry.code}</span>
            </>
          ) : (
            <span className="text-gray-400">+65 SG</span>
          )}
          <span className="ml-auto text-gray-400">▼</span>
        </div>
        {dropdownOpen && (
          <div className="absolute left-0 right-0 min-w-[320px] mt-1 bg-[#18181b] rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto border border-[#374151]">
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#23272a] text-white border-b border-[#374151] rounded-t-lg focus:outline-none"
              placeholder={t('phone.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            {filteredCountries.length === 0 && (
              <div className="px-3 py-2 text-gray-400">{t('phone.noCountries')}</div>
            )}
            {filteredCountries.map(c => (
              <div
                key={c.code}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#374151] text-white"
                onClick={() => handleCountrySelect(c)}
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.dial}</span>
                <span className="ml-2 text-white">{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Phone number input */}
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        required
        placeholder={t('modal.sales.placeholderPhone')}
        value={value.number}
        onChange={handleNum}
        className="flex-1 form-input px-4 bg-[#23272a] text-white border-[#374151] rounded-lg"
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(PhoneField);

