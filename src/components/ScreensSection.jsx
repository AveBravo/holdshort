import React from 'react'; 
import { Card, Tooltip, Image, Button, Tabs, Tab } from "@heroui/react";
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { screenshots } from '../data.jsx';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("web");

  const handlePrevious = (images) => {
    setDirection(-1);
    setCurrentIndex((current) => (current === 0 ? images.length - imagesToShow : current - 1));
  };

  const handleNext = (images) => {
    setDirection(1);
    setCurrentIndex((current) => (current + imagesToShow >= images.length ? 0 : current + 1));
  };

  const imagesToShow = activeTab === "web" ? 1 : 4;

  const CarouselContent = ({ images, isWebTab = false }) => {
    const visibleImages = images.slice(currentIndex, currentIndex + imagesToShow);
    if (visibleImages.length < imagesToShow) {
      visibleImages.push(...images.slice(0, imagesToShow - visibleImages.length));
    }

    return (
      <div className="relative w-full rounded-lg">
        <Button
          isIconOnly
          size="lg"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-600 z-20 shadow-xl"
          onPress={() => handlePrevious(images)}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Button>
        <Button
          isIconOnly
          size="lg"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-600 z-20 shadow-xl"
          onPress={() => handleNext(images)}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </Button>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="flex overflow-hidden "
          >
            {visibleImages.map((image, idx) => (
              <Tooltip key={idx} content={image.alt} placement="center" className="z-10">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={isWebTab ? "w-full max-w-full" : "sm:w-1/2 md:w-1/3 lg:w-1/4"}
                >
                  <Card className='mx-2'>
                    <Image
                      isBlurred
                      width={'100%'}
                      src={image.url}
                      alt={image.alt}
                      className="brightness-90 h-full w-full radius-lg"
                      style={{
                        objectFit: activeTab === "web" ? 'cover' : 'cover',
                        aspectRatio: activeTab === "app" ? '8/16' : '16/9'
                      }}
                        />
                    </Card>
                </motion.div>
              </Tooltip>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          Experience Our Platform
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Take a tour of our intuitive interfaces, designed for both web and mobile experiences
        </p>
      </div>

      <Tabs 
        aria-label="Platform Screenshots"
        color="primary"
        variant="bordered"
        classNames={{
          tabList: 'gap-4 sm:gap-6',
          tab: 'h-12 sm:h-14',
          cursor: 'bg-primary',
          tabContent: 'group-data-[selected=true]:text-white'
        }}
        onSelectionChange={(selectedTab) => {
          setActiveTab(selectedTab);
          setCurrentIndex(0);
          setDirection(0);
        }}
      >
        <Tab
          key="app"
          title={
            <div className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mobile App</span>
            </div>
          }
        >
          <CarouselContent images={screenshots.app} />
        </Tab>
        <Tab
          key="web"
          title={
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Web Platform</span>
            </div>
          }
        >
          <CarouselContent images={screenshots.web} isWebTab />
        </Tab>
      </Tabs>
    </div>
  );
}
