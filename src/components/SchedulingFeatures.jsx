import React from 'react';
import { Card, CardBody, Image, Button, Tabs, Tab } from "@heroui/react";
import { features } from '../data.jsx';

export default function SchedulingFeatures() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Scheduling & Aircraft Management System Features
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Streamline your aviation operations with our comprehensive management system
        </p>
      </div>

      <Tabs 
        aria-label="Features" 
        color="primary"
        variant="bordered"
        classNames={{
          tabList: "gap-6",
          tab: "h-14",
          cursor: "bg-primary",
          tabContent: "group-data-[selected=true]:text-white",
          panel: "overflow-visible pt-6"
        }}
      >
        {features.map((feature, index) => (
          <Tab
            key={index}
            title={
              <div className="flex items-center space-x-2">
                <div className="text-default-500 group-data-[selected=true]:text-white">{feature.icon}</div>
                <span>{feature.title}</span>
              </div>
            }
          >
            <Card>
              <CardBody className='overflow-hidden'>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-auto">
                    <Image
                      isBlurred
                      src={feature.image}
                      alt={feature.imageAlt}
                      radius="lg"
                      classNames={{
                        wrapper: "w-full h-full",
                        img: "object-cover w-full h-full"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg" />
                    <h3 className="absolute bottom-6 left-6 text-2xl font-bold text-white z-10">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    <Button
                      color="primary"
                      className="mt-6 w-fit"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
      <div className="flex items-center justify-center">
        <Button
          size="lg"
          color="primary"
          className="max-w-sm w-full mt-12"
        > 
          Get Started
        </Button>
      </div>
    </div>
  );
}