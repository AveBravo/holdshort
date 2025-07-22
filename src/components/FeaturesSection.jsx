import React from 'react';
import { Card } from "@heroui/react";
import { benefits } from '../data.jsx';

export default function FeaturesSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Flight Schools, Flying Clubs, Pilots and Student Pilots may:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group"
              isPressable
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <div className="text-primary-500">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}