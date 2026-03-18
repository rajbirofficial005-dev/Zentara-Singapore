import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

// Popular currency pairs
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
];

interface ExchangeRateData {
  rate: number;
  timestamp: number;
  change24h: number;
}


const CurrencyConverter: React.FC = () => {
  const { t } = useTranslation();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('SGD');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current exchange rate
  const fetchExchangeRate = async (from: string, to: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data = await response.json();
      const rate = data.rates[to];
      
      // Calculate mock 24h change (in production, you'd fetch this from historical data)
      const change24h = (Math.random() - 0.5) * 2; // Random change between -1% and +1%

      setExchangeRate({
        rate,
        timestamp: Date.now(),
        change24h,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch rates');
      console.error('Error fetching exchange rate:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch when currencies change
  useEffect(() => {
    fetchExchangeRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchExchangeRate(fromCurrency, toCurrency);
    }, 60000);

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  return (
    <div className="w-full space-y-12">
      {/* Currency Pair Display Card */}
      <motion.div
        className=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Currency Selectors — stack on mobile, row on larger screens */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-4 mb-8">
          {/* From Currency Box */}
          <div className="flex-1 w-full sm:max-w-xs">
            <label className="block text-neutral-400 text-xs mb-2 font-primary uppercase tracking-wide">{t('converter.from')}</label>
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/50 rounded-xl p-4 hover:border-primary/50 transition-all">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-transparent text-white font-primary text-lg border-0 focus:outline-none cursor-pointer appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapCurrencies}
            className="p-3 bg-primary hover:bg-primary/80 rounded-full transition-all duration-300 hover:scale-110 group self-center sm:mb-1 flex-shrink-0"
            aria-label="Swap currencies"
          >
            <svg
              className="w-6 h-6 text-neutral-900 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </button>

          {/* To Currency Box */}
          <div className="flex-1 w-full sm:max-w-xs">
            <label className="block text-neutral-400 text-xs mb-2 font-primary uppercase tracking-wide">{t('converter.to')}</label>
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/50 rounded-xl p-4 hover:border-primary/50 transition-all">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-transparent text-white font-primary text-lg border-0 focus:outline-none cursor-pointer appearance-none"
                style={{ colorScheme: 'dark' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Exchange Rate Display */}
        {loading && !exchangeRate ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-neutral-400 mt-4 font-primary">{t('converter.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 font-primary">{error}</p>
            <button
              onClick={() => fetchExchangeRate(fromCurrency, toCurrency)}
              className="mt-4 px-6 py-2 bg-primary text-neutral-900 rounded-full font-primary hover:bg-primary/80 transition-all"
            >
              {t('converter.retry')}
            </button>
          </div>
        ) : exchangeRate ? (
          <div className="text-center space-y-4">
            {/* Rate */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${fromCurrency}-${toCurrency}-${exchangeRate.rate}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <div className="text-primary text-4xl sm:text-5xl md:text-6xl font-extrabold font-primary">
                  <CountUp
                    end={exchangeRate.rate}
                    decimals={4}
                    duration={1}
                    separator=","
                    preserveValue
                  />
                </div>
                <p className="text-neutral-400 text-lg font-primary">
                  1 {fromCurrencyData?.symbol} {fromCurrency} = {exchangeRate.rate.toFixed(4)} {toCurrencyData?.symbol} {toCurrency}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Last Updated */}
            <p className="text-neutral-500 text-sm font-primary">
              {t('converter.lastUpdated')} {new Date(exchangeRate.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default CurrencyConverter;

