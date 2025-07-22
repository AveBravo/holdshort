import React from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { Check, Plane, Users, Building2, DollarSign, MapPin } from 'lucide-react';
import { plans } from '../data.jsx';

export default function PricingSection() {
  const [isYearly, setIsYearly] = React.useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Choose the perfect plan for your aviation needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Button
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                !isYearly
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
              onPress={() => setIsYearly(false)}
            >
              Monthly
            </Button>
            <Button
              color="primary" variant="ghost"
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isYearly
                  ? 'bg-primary text-white'
                  : ' text-gray-600 dark:text-gray-400'
              }`}
              onPress={() => setIsYearly(true)}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`group border-2 border-transparent transition-all ${plan.borderColor} ${
                plan.popular ? 'scale-105' : ''
              }`}
            >
              <CardHeader className="flex gap-3 p-6">
                <div className={`p-2 rounded-lg ${plan.color} bg-opacity-10`}>
                  {plan.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{plan.name}</p>
                  {plan.popular && (
                    <Chip color="primary" size="sm" variant="flat">
                      Most Popular
                    </Chip>
                  )}
                </div>
              </CardHeader>
              <CardBody className="px-6 py-2 space-y-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    per {isYearly ? 'year' : 'month'}
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(plan.features).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>

                <Button
                  color="primary"
                  size="lg"
                  className="w-full"
                  variant={plan.popular ? "solid" : "bordered"}
                >
                  Sign In & Buy now!
                </Button>

                {isYearly && (
                  <p className="text-sm text-center text-success">
                    Save {plan.savings} with yearly billing
                  </p>
                )}
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Additional Options Section */}
        <div className="flex flex-col items-center mt-16">
          <h3 className="text-2xl font-bold mb-6">Need more?</h3>
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <Plane className="w-8 h-8 text-blue-500" />
              <p className="mt-2 font-semibold">Add more Aircraft & Resources</p>
              <p className="text-gray-500">for just <span className="text-blue-500">$5</span> per month</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-blue-500" />
              <p className="mt-2 font-semibold">Add more Locations</p>
              <p className="text-gray-500">for just <span className="text-blue-500">$10</span> per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
