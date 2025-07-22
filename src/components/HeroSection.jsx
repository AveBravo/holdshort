import React from 'react';
import { Button, Badge } from "@heroui/react";
import { Plane } from 'lucide-react';
import RotatingText from './RotatingText';

const HeroSection = () => {
  return (
    <div className="px-6 pt-16 pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-8 dark:text-gray-400 dark:border-gray-600">
          ✨ Voted #1 hottest product ✨
        </Badge>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
        <span className='font-thin'>Use our apps to</span> <br /><span className='font-bold'>schedule a plane</span><span className="inline-flex items-center">✈️</span>
          <br />
        <RotatingText
          texts={['anytime', 'anywhere']}
          mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center dark:text-white"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.040}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        For Flight Schools, Flying Clubs, FBOs, Aircraft Partnerships and General Aviation
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button color="primary" size="lg" className="flex items-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800">
            Start with Holdshort
            <Plane className="w-5 h-5 dark:text-white" />
          </Button>
          <Button color="default" variant="bordered" size="lg" className="dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800">
            Try a Demo
          </Button>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px]">
            {/* Light theme calendar */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat dark:hidden"
              style={{ backgroundImage: 'url(/calendar.webp)' }}
            />
            {/* Dark theme calendar */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat hidden dark:block"
              style={{ backgroundImage: 'url(/calendar-dark.webp)' }}
            />
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-white/90 dark:from-gray-800/90 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;