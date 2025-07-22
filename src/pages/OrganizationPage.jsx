import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Badge,
  Chip,
} from "@heroui/react";
import {
  Home,
  Building2,
  Calendar,
  Users,
  MapPin,
  Shield,
  Settings,
  CreditCard,
  Mail,
  Bell,
  FileText,
  BarChart3,
  LayoutDashboard,
  Plane,
  GraduationCap,
  Monitor,
  Wrench,
} from "lucide-react";

const serviceIcons = {
  'Aircraft Rental': <Plane className="w-4 h-4" />,
  'Flight Training': <GraduationCap className="w-4 h-4" />,
  'Ground Training': <GraduationCap className="w-4 h-4" />,
  'Simulator Training': <Monitor className="w-4 h-4" />,
  'Aircraft Inspection': <Shield className="w-4 h-4" />,
  'Repair Powerplant': <Wrench className="w-4 h-4" />,
  'Repair Airframe': <Wrench className="w-4 h-4" />,
  'Sightseeing Tours': <Plane className="w-4 h-4" />,
};

import { Link, useNavigate } from "react-router-dom";

const organizationInfo = {
  name: "JetSuite",
  phone: "15037408243",
  fax: "+17184350680",
  website: "https://FlyForReal.com",
  email: "test.member-db@gmail.com",
  address: "suite 11",
  city: "-",
  state: "California",
  zip: "234sdfsf",
  created: "18 Dec, 2013",
  country: "United States",
};

const menuItems = [
  {
    key: "calendar",
    label: "Calendar",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    key: "users",
    label: "Users",
    icon: <Users className="w-4 h-4" />,
    href: "/organization-users",
  },
  {
    key: "locations",
    label: "Locations",
    icon: <MapPin className="w-4 h-4" />,
    href: "/locations",
  },
  {
    key: "resources",
    label: "Resources",
    icon: <Plane className="w-4 h-4" />,
    href: "/resources",
  },
  {
    key: "manifest-builder",
    label: "Manifest Builder",
    icon: <FileText className="w-4 h-4" />,
    href: "/manifest-builder/:id",
  },
  {
    key: "security",
    label: "Security Settings",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    key: "billing",
    label: "Billing",
    icon: <CreditCard className="w-4 h-4" />,
  },
  { key: "email", label: "Mass Email", icon: <Mail className="w-4 h-4" /> },
  {
    key: "notifications",
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  { key: "reports",
    label: "Reports",
    icon: <FileText className="w-4 h-4" />,
    href:"/reports",
  },
  {
    key: "activity",
    label: "Activity Log",
    icon: <BarChart3 className="w-4 h-4" />,
  },
];

const locations = [
  {
    id: 1,
    name: 'Штаб',
    code: 'SDAS',
    address: 'ул. Королева 801, Vinnitsya, Bedfordshire, 21000, United Kingdom',
    services: ['Aircraft Rental', 'Aircraft Inspection', 'Repair Powerplant', 'Repair Airframe']
  },
  {
    id: 2,
    name: 'Офис',
    code: 'AAA',
    address: '5 этаж, Vinniteyaaaaaa, New Brunswick, 123123, Canada',
    services: ['Aircraft Rental', 'Flight Training', 'Ground Training', 'Simulator Training', 'Sightseeing Tours', 'Repair Powerplant', 'Repair Airframe']
  },
  {
    id: 3,
    name: 'Днепро',
    code: 'KBP',
    address: 'Barske shosse 133, Kyiv, Alabama, 21000, United States',
    services: []
  },
  {
    id: 4,
    name: 'New York',
    code: 'LGA',
    address: 'La Guardia, New York, United States',
    services: ['Flight Training']
  },
  {
    id: 5,
    name: 'Farmingdale',
    code: 'FRG',
    address: '108 Rt 109 Suite 206, Farmingdale, New York, 11735, United States',
    services: ['Aircraft Rental', 'Flight Training', 'Ground Training', 'Simulator Training']
  }
];

export default function OrganizationPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem startContent={<Home className="w-4 h-4" />} href="/">
            Home
          </BreadcrumbItem>
          <BreadcrumbItem
            startContent={<LayoutDashboard className="w-4 h-4" />}
          >
            Dashboard
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<Building2 className="w-4 h-4" />}>
            {organizationInfo.name}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Organization Info */}
        <Card className="lg:col-span-4">
          <CardBody>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {organizationInfo.name}
                  </h1>
                  <p className="text-default-500">Organization Details</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<Settings className="w-4 h-4" />}
                  onPress={() => navigate("/organization-settings")}
                >
                  Settings
                </Button>
                <Button
                  color="primary"
                  startContent={<CreditCard className="w-4 h-4" />}
                  onPress={() => navigate('/subscription-plan' )}
                >
                  Change Subscription Plan
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    as={Link}
                    to={item.href || "#"}
                    key={item.key}
                    variant="light"
                    className="w-full justify-start"
                    startContent={item.icon}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Organization Information</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-default-500">Phone:</span>{" "}
                      {organizationInfo.phone}
                    </p>
                    <p>
                      <span className="text-default-500">Fax:</span>{" "}
                      {organizationInfo.fax}
                    </p>
                    <p>
                      <span className="text-default-500">Website:</span>{" "}
                      <Link
                        color="primary"
                        href={organizationInfo.website}
                      >
                        {organizationInfo.name}
                      </Link>
                    </p>
                    <p>
                      <span className="text-default-500">Email:</span>{" "}
                      {organizationInfo.email}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Address Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="text-default-500">Address:</span>{" "}
                      {organizationInfo.address}
                    </p>
                    <p>
                      <span className="text-default-500">City:</span>{" "}
                      {organizationInfo.city}
                    </p>
                    <p>
                      <span className="text-default-500">State:</span>{" "}
                      {organizationInfo.state}
                    </p>
                    <p>
                      <span className="text-default-500">ZIP:</span>{" "}
                      {organizationInfo.zip}
                    </p>
                    <p>
                      <span className="text-default-500">Country:</span>{" "}
                      {organizationInfo.country}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

           {/* Organization Locations */}
           <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Organization Locations</h2>
              <Button
                color="primary"
                variant="light"
                startContent={<MapPin className="w-4 h-4" />}
                onPress={() => onNavigate({ page: 'locations' })}
              >
                Manage Locations
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 rounded-xl border border-default-200 hover:border-primary transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{location.name}</h3>
                        <Badge color="primary" variant="flat">{location.code}</Badge>
                      </div>
                      <p className="text-default-500 text-sm">{location.address}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {location.services.map((service, index) => (
                        <Chip
                          key={index}
                          startContent={serviceIcons[service]}
                          variant="flat"
                          size="sm"
                        >
                          {service}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
