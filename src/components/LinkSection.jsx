import React from 'react';
import { Button } from "@heroui/react";
import { Apple, Play } from 'lucide-react';



export default function LinkSection() {
    return (
        <div className="bg-primary-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Download the App:
                    </h2>
                </div>
                <div className="flex flex-сol md:flex-row gap-4 justify-center items-center">
                    <Button
                        as='a'
                        href='https://apps.apple.com/us/app/holdshort/id6449998606'
                        target='_blank'
                        color="primary"
                        variant="ghost"
                        startContent={<Apple className="w-8 h-8" />}
                        size='lg'
                        className='w-full md:w-auto h-50 '
                    >
                        <div className="p-2">
                            <span className='text-sm mr-2 '>Available on</span>
                            <p className='font-bold text-lg'>App Store</p>
                        </div>
                    </Button>
                    <Button
                        as='a'
                        href='https://play.google.com/store/apps/details?id=com.holdshort'
                        target='_blank'
                        color="primary"
                        variant="ghost"
                        startContent={<Play className="w-8 h-8" />}
                        size='lg'
                        className='w-full md:w-auto h-50 content-center'
                    >
                        <div className="p-2">
                            <span className='text-sm mr-2'>Get It on</span>
                            <p className='font-bold text-lg'>Google Play</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}