import React from 'react';
import { Card, CardBody, Button, Image } from "@heroui/react";
import { ArrowRight } from 'lucide-react';
import {about} from '../data';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
            {about.title}
          </h2>
          
          <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
            <p>
              {about.desc}
            </p>
            <p>
              {about.desc2}
            </p>
            
            <p className='text-sm'>
             {about.subdesc}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              color="primary"
              endContent={<ArrowRight className="w-4 h-4" />}
              size="lg"
            >
              Read More
            </Button>
          </div>
        </div>
        <Card className="relative w-full aspect-[4/3]">
          <CardBody className="p-0 overflow-hidden">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 blur-2xl opacity-30" />
                <Image
                isBlurred
                width={800}
                height={600}
                src={about.image}
                alt={about.alt}
                classNames={{
                    wrapper: "w-full h-full",
                    img: "object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                }}
             />
         </CardBody>
        </Card>
      </div>
    </div>
  );
}