import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  Users,
  Plane,
  Shield,
  Wrench,
  Headphones,
  Database,
  LayoutGrid,
  UserCheck,
} from "lucide-react";

const features = [
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Unlimited Instructors",
    description: "Add unlimited instructors appearing on the schedule",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Unlimited Pilots & Users",
    description: "No restrictions on the number of pilots and users",
    color: "text-green-500",
    bgColor: "bg-green-500/10 dark:bg-green-500/20",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "FAA Certificate Enforcement",
    description: "Medical, Ratings, & Endorsements verification",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
  },
  {
    icon: <LayoutGrid className="w-8 h-8" />,
    title: "Unlimited Resources",
    description: "Manage all your resources without limitations",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-500/20",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Complete Maintenance Management",
    description: "Track and manage all maintenance activities",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Aircraft Dispatch Control",
    description: "Efficient aircraft dispatching and tracking",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Live Customer Support",
    description: "24/7 dedicated customer support access",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Initial Set-Up and Data Migration",
    description: "Complete data migration and setup assistance",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
  },
];

export default function AccountFeatures() {
  return (
    <div className="bg-default-50 dark:bg-default-900">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            All Accounts Include
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none"
              shadow="sm"
              isPressable
              isHoverable
            >
              <CardBody className="gap-4">
                <div className={`p-3 rounded-xl w-fit ${feature.bgColor}`}>
                  <div className={feature.color}>{feature.icon}</div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-default-500 text-sm">
                    {feature.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
