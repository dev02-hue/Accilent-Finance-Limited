'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import Image from 'next/image';

interface Investor {
  id: string;
  name: string;
  title: string;
  image: string;
  investmentAmount: string;
  investmentFocus: string;
  quote?: string;
}

const TopInvestors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedInvestor, setExpandedInvestor] = useState<Investor | null>(null);

  // Sample investor data - replace with your actual investors
  const investors: Investor[] = [
    {
      id: '1',
      name: 'Carlos',
      title: 'Managing Partner, Horizon Capital',
      image: '/avatar.jpeg',
      investmentAmount: '$4k',
      investmentFocus: 'Fintech & Blockchain',
      quote: "Accilent Finance Limited represents the future of borderless finance with their innovative approach."
    },
    {
      id: '2',
      name: 'Raj Patel',
      title: 'Founder, Global Ventures',
      image: '/photo-1530949587799-f0d718ce1c27.avif',
      investmentAmount: '$10k',
      investmentFocus: 'Digital Banking Infrastructure',
      quote: "The team's vision for seamless multi-currency banking is unmatched in the industry."
    },
    {
      id: '3',
      name: 'Sophie Müller',
      title: 'CIO, Alpine Investments',
      image: '/premium_photo-1688350808212-4e6908a03925.avif',
      investmentAmount: '$10k',
      investmentFocus: 'AI-Driven Financial Services',
      quote: "Accilent Finance Limited combines regulatory excellence with true technological innovation."
    },
    {
      id: '4',
      name: 'James Wilson',
      title: 'Partner, Oak Tree Capital',
      image: '/photo-1598140772250-3421a28cd6a9.avif',
      investmentAmount: '$7k',
      investmentFocus: 'Embedded Finance Solutions',
      quote: "Their growth metrics and customer satisfaction numbers speak for themselves."
    },
    {
      id: '5',
      name: 'Nia Okeke',
      title: 'Director, Pan-African Investment Group',
      image: '/photo-1668639534786-2a1f0e476755.avif',
      investmentAmount: '$6k',
      investmentFocus: 'Emerging Market Expansion',
      quote: "Accilent Finance Limited has the perfect strategy for serving global digital nomads and expats."
    }
  ];

  const visibleInvestors = investors.slice(currentIndex, currentIndex + 3);
  
  const nextInvestor = () => {
    setCurrentIndex(prev => (prev + 1) % (investors.length - 2));
  };

  const prevInvestor = () => {
    setCurrentIndex(prev => (prev - 1 + (investors.length - 2)) % (investors.length - 2));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            <span className="text-green-600">Our Trusted </span>
            <span>Investors</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visionary partners who believe in our mission of borderless banking
          </p>
        </motion.div>

        {/* Investors Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevInvestor}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous investors"
          >
            <FiChevronLeft className="text-gray-700 text-xl" />
          </button>
          <button 
            onClick={nextInvestor}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next investors"
          >
            <FiChevronRight className="text-gray-700 text-xl" />
          </button>

          {/* Investors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleInvestors.map((investor) => (
              <motion.div
                key={investor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => setExpandedInvestor(investor)}
              >
                <div className="relative h-64">
                  <Image
                    src={investor.image}
                    alt={investor.name}
                    height={256}
                    width={256}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{investor.name}</h3>
                    <p className="text-sm text-blue-200">{investor.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiDollarSign className="mr-1" />
                      <span>{investor.investmentAmount}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiTrendingUp className="mr-1" />
                      <span>{investor.investmentFocus}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investor Detail Modal */}
        <AnimatePresence>
          {expandedInvestor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setExpandedInvestor(null)}
            >
              <div className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setExpandedInvestor(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
                  aria-label="Close investor details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Investor Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={expandedInvestor.image}
                    alt={expandedInvestor.name}
                    height={256}
                    width={256}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Investor Content */}
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{expandedInvestor.name}</h2>
                    <p className="text-blue-600">{expandedInvestor.title}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <FiDollarSign className="mr-2 text-blue-600" /> Investment
                      </h3>
                      <p className="text-gray-600">{expandedInvestor.investmentAmount}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <FiTrendingUp className="mr-2 text-blue-600" /> Focus Area
                      </h3>
                      <p className="text-gray-600">{expandedInvestor.investmentFocus}</p>
                    </div>
                  </div>

                  {expandedInvestor.quote && (
                    <div className="border-l-4 border-blue-600 pl-4 mb-6">
                      <blockquote className="italic text-gray-700">
                        &apos;{expandedInvestor.quote}&apos;
                      </blockquote>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">About Accilent Finance Limited Investment</h3>
                    <p className="text-gray-600">
                      Our investors share our vision for borderless banking and support our mission to deliver innovative financial solutions worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        
      </div>
    </section>
  );
};

export default TopInvestors;