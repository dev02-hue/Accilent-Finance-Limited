"use client";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaBitcoin, FaEthereum, FaMountain } from "react-icons/fa";
import { SiSolana, SiCardano, SiPolkadot,  SiChainlink } from "react-icons/si";

interface CryptoData {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  change: number;
  isUp: boolean;
  volume: number;
  marketCap: number;
}

const CryptoCurrencyTicker = () => {
  // Crypto icons mapping
  const cryptoIcons: Record<string, React.ReactNode> = {
    BTC: <FaBitcoin className="text-orange-500" />,
    ETH: <FaEthereum className="text-purple-500" />,
    SOL: <SiSolana className="text-green-500" />,
    ADA: <SiCardano className="text-blue-500" />,
    DOT: <SiPolkadot className="text-pink-500" />,
    AVAX: <FaMountain className="text-red-500" />,
    LINK: <SiChainlink className="text-blue-400" />,
  };

  // Initial crypto data with numerical values for animation
  const initialData: CryptoData[] = [
    { symbol: "BTC", name: "Bitcoin", icon: cryptoIcons.BTC, price: 64289.78, change: 2.34, isUp: true, volume: 32456789012, marketCap: 1265789012345 },
    { symbol: "ETH", name: "Ethereum", icon: cryptoIcons.ETH, price: 3412.56, change: -1.12, isUp: false, volume: 14567890123, marketCap: 412567890123 },
    { symbol: "SOL", name: "Solana", icon: cryptoIcons.SOL, price: 142.89, change: 5.67, isUp: true, volume: 3456789012, marketCap: 64567890123 },
    { symbol: "ADA", name: "Cardano", icon: cryptoIcons.ADA, price: 0.4523, change: -0.89, isUp: false, volume: 567890123, marketCap: 15678901234 },
    { symbol: "DOT", name: "Polkadot", icon: cryptoIcons.DOT, price: 6.78, change: 3.45, isUp: true, volume: 234567890, marketCap: 8456789012 },
    { symbol: "AVAX", name: "Avalanche", icon: cryptoIcons.AVAX, price: 35.21, change: 7.12, isUp: true, volume: 789012345, marketCap: 13456789012 },
    { symbol: "LINK", name: "Chainlink", icon: cryptoIcons.LINK, price: 14.56, change: -2.34, isUp: false, volume: 345678901, marketCap: 8456789012 },
  ];

  const [cryptoData, setCryptoData] = useState<CryptoData[]>(initialData);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Function to format currency
  const formatCurrency = (value: number, compact = false) => {
    if (compact && value >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
      }).format(value);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);
  };

  // Function to simulate price changes
  const updatePrices = () => {
    if (isHovered) return; // Don't update prices while user is interacting
    
    setCryptoData(prevData =>
      prevData.map(item => {
        // Generate more realistic price changes (-1.5% to +1.5%)
        const randomChange = (Math.random() * 3 - 1.5) / 100;
        const newPrice = item.price * (1 + randomChange);
        const change = (randomChange * 100);
        const newVolume = item.volume * (1 + (Math.random() * 0.2 - 0.1));
        const newMarketCap = item.marketCap * (1 + (Math.random() * 0.1 - 0.05));
        
        return {
          ...item,
          price: newPrice,
          change: parseFloat(change.toFixed(2)),
          isUp: change >= 0,
          volume: newVolume,
          marketCap: newMarketCap
        };
      })
    );
  };

  // Animate the ticker and update prices periodically
  useEffect(() => {
    // Start the ticker animation
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      },
    });

    // Update prices every 8 seconds
    const interval = setInterval(updatePrices, 8000);

    return () => clearInterval(interval);
  }, [controls, isHovered]);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800 py-4 overflow-hidden h-20 flex items-center ">
      {/* Ticker label */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 flex items-center pl-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <span className="font-semibold text-green-400 text-sm uppercase tracking-wider">Live Markets</span>
        </div>
      </div>
      
      {/* Ticker container */}
      <div 
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex items-center"
          animate={isHovered ? { x: 0 } : controls}
        >
          {[...cryptoData, ...cryptoData].map((crypto, index) => (
            <motion.a
              key={`${crypto.symbol}-${index}`}
              href="#"
              className="flex items-center px-6 py-2 whitespace-nowrap group"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Crypto icon and symbol */}
              <div className="flex items-center w-24">
                <div className="mr-3 text-xl">
                  {crypto.icon}
                </div>
                <div>
                  <span className="font-medium text-gray-200 group-hover:text-white text-sm">
                    {crypto.symbol}
                  </span>
                  <span className="block text-xs text-gray-400">{crypto.name}</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="mx-3 text-gray-100 w-32 text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={crypto.price}
                    initial={{ y: crypto.isUp ? 10 : -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: crypto.isUp ? -10 : 10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-medium"
                  >
                    {formatCurrency(crypto.price)}
                    <div className="text-xs text-gray-400">
                      MCap: {formatCurrency(crypto.marketCap, true)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Change percentage */}
              <div className={`flex items-center w-24 ${crypto.isUp ? 'text-green-400' : 'text-red-400'}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={crypto.change}
                    initial={{ y: crypto.isUp ? 10 : -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: crypto.isUp ? -10 : 10, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    {crypto.isUp ? (
                      <FiTrendingUp className="mr-1.5" />
                    ) : (
                      <FiTrendingDown className="mr-1.5" />
                    )}
                    {crypto.change > 0 ? '+' : ''}{crypto.change}%
                    <div className="ml-2 text-xs text-gray-400">
                      Vol: {formatCurrency(crypto.volume, true)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Action arrow */}
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <FiArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
      
       
    </div>
  );
};

export default CryptoCurrencyTicker;