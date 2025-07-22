import React, { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Image, Skeleton } from "@heroui/react";
import { Users, Play } from 'lucide-react';

export default function HowItWorks() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Skeleton isLoaded={true} className="rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        </Skeleton>
        <Skeleton isLoaded={true} className="rounded-lg max-w-2xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover how HoldShort streamlines flight school management and enhances your aviation experience
          </p>
        </Skeleton>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Skeleton isLoaded={true} className="space-y-4">
            <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-lg">
              <Users className="w-6 h-6 text-primary-500" />
            </div>
            <h4 className="text-2xl font-bold">
              Add all your users, Pilots or Flight Instructors – no limits
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Manage your entire aviation team efficiently with our unlimited user system. 
              Perfect for flight schools, clubs, and training organizations of any size.
            </p>
          </Skeleton>
          
          <Skeleton isLoaded={true}>
            <Button 
              size="lg" 
              color="primary"
              onPress={onOpen}
            >
              Start your free 60 day trial
            </Button>
          </Skeleton>
        </div>

        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
  {!videoPlaying ? (
    <div 
      className="absolute inset-0 cursor-pointer group"
      onClick={() => setVideoPlaying(true)}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors z-10" />

      <Image
        isZoomed
        width={'100%'}
        radius="none"
        src="/bristell-energic-index-cover.webp"
        alt="Red aircraft in hangar"
        classNames={{
          wrapper: "w-full h-full z-0",
          img: "w-full h-full object-cover"
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <Play className="w-8 h-8 text-primary-500 ml-1" />
        </div>
      </div>
    </div>
  ) : (
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/iO_8rNiA1o0?autoplay=1"
      title="HoldShort Demo Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )}
</div>

      </div>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Start your free 60 day trial
              </ModalHeader>
              <ModalBody>
                <Skeleton isLoaded={true} className="w-full">
                  <Input
                    label="Organization Name"
                    placeholder="Enter your organization name"
                    variant="bordered"
                  />
                </Skeleton>
                <Skeleton isLoaded={true} className="w-full">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    variant="bordered"
                  />
                </Skeleton>
                <Skeleton isLoaded={true} className="w-full">
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                </Skeleton>
                <Skeleton isLoaded={true} className="w-full">
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Create a password"
                    variant="bordered"
                  />
                </Skeleton>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}