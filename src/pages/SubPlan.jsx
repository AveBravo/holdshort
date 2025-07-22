import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ButtonGroup,
  Divider,
  Chip,
} from '@heroui/react';
import { Home, Building2, CreditCard, Plus, Minus, Check, Info } from 'lucide-react';

const plans = [
  {
    name: 'Shared Plane',
    users: 'Unlimited',
    locations: 1,
    resources: 1,
    basePrice: 110.00,
    totalPrice: 110.00,
    monthlyPrice: 10.00,
    description: 'Great for small partnerships or clubs which share a single aircraft.',
  },
  {
    name: 'Flying Club',
    users: 'Unlimited',
    locations: 1,
    resources: 5,
    basePrice: 330.00,
    totalPrice: 330.00,
    monthlyPrice: 30.00,
    description: 'Great for small businesses at a single location with up to 5 resources or aircraft.',
  },
  {
    name: 'Flight School',
    users: 'Unlimited',
    locations: 2,
    resources: 10,
    basePrice: 605.00,
    totalPrice: 605.00,
    monthlyPrice: 55.00,
    description: 'Great for large businesses with 1-2 locations and up to 10 resources.',
  },
  {
    name: 'Enterprise',
    users: 'Unlimited',
    locations: 'Unlimited',
    resources: 'Unlimited',
    basePrice: 5489.00,
    totalPrice: 5489.00,
    monthlyPrice: 499.00,
    description: 'Ideal for large or advanced organizations, with multiple locations and aircraft. Complete access to all features.',
  },
];

const includedFeatures = [
  'UNLIMITED Instructors appearing on the schedule',
  'UNLIMITED Pilots & Users',
  'FAA Certificate Enforcement (Medical, Ratings, & Endorsements)',
  'Complete Scheduling Management Control',
  'Complete Maintenance Management',
  'Aircraft Dispatch Control',
  'Live Customer Support',
  'Initial Set-Up and Data Migration',
];

const upcomingFeatures = [
  'Integrated Accounting & Financial Tracking',
  'Custom Flight Training Syllabus Tracking',
];

export default function SubscriptionPlan({ onNavigate }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const currentPlan = 'Enterprise';
  const [selectedPlan, setSelectedPlan] = React.useState(
    plans.find(p => p.name === 'Shared Plane')
  );

  const handlePlanChange = (planName) => {
    const plan = plans.find(p => p.name === planName);
    setSelectedPlan(plan);
  };

  const handleConfirmChange = () => {
    // Handle plan change confirmation
    onClose();
  };

  const getCurrentPlanDetails = () => {
    return plans.find(p => p.name === currentPlan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs size="lg">
          <BreadcrumbItem 
            startContent={<Home className="w-4 h-4" />}
            onPress={() => onNavigate({ page: 'home' })}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem 
            startContent={<Building2 className="w-4 h-4" />}
            onPress={() => onNavigate({ page: 'organization' })}
          >
            Organization
          </BreadcrumbItem>
          <BreadcrumbItem startContent={<CreditCard className="w-4 h-4" />}>
            Subscription Plan
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <section className="mb-6">
        
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Subscription Plan</h1>
              <p className="text-default-500">Current Plan: {currentPlan}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-default-500">Change Plan To:</span>
              <ButtonGroup>
                {plans.map((plan) => (
                  <Button
                    key={plan.name}
                    size="sm"
                    variant={selectedPlan?.name === plan.name ? "solid" : "bordered"}
                    color={selectedPlan?.name === plan.name ? "primary" : "default"}
                    onPress={() => handlePlanChange(plan.name)}
                  >
                    {plan.name}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>
       

          <Table aria-label="Subscription plans comparison">
            <TableHeader>
              <TableColumn>FEATURE</TableColumn>
              <TableColumn>CURRENT</TableColumn>
              <TableColumn>NEW PLAN</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Users in Plan</TableCell>
                <TableCell>{getCurrentPlanDetails()?.users}</TableCell>
                <TableCell>{selectedPlan?.users}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Locations in Plan</TableCell>
                <TableCell>{getCurrentPlanDetails()?.locations}</TableCell>
                <TableCell>{selectedPlan?.locations}</TableCell>
                <TableCell className="flex gap-2">
                  {typeof selectedPlan?.locations === 'number' && (
                    <>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        isDisabled={selectedPlan.locations <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        isDisabled={selectedPlan.locations >= getCurrentPlanDetails()?.locations}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Resources in Plan</TableCell>
                <TableCell>{getCurrentPlanDetails()?.resources}</TableCell>
                <TableCell>{selectedPlan?.resources}</TableCell>
                <TableCell className="flex gap-2">
                  {typeof selectedPlan?.resources === 'number' && (
                    <>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        isDisabled={selectedPlan.resources <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="flat"
                        isDisabled={selectedPlan.resources >= getCurrentPlanDetails()?.locations}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Base Plan Price</TableCell>
                <TableCell>${getCurrentPlanDetails()?.basePrice.toFixed(2)} / year</TableCell>
                <TableCell>${selectedPlan?.basePrice.toFixed(2)} / year</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Price</TableCell>
                <TableCell className="font-bold">${getCurrentPlanDetails()?.totalPrice.toFixed(2)} / year</TableCell>
                <TableCell className="font-bold">${selectedPlan?.totalPrice.toFixed(2)} / year</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          

          <div className="flex justify-end gap-2 mt-8">
            <Button
              variant="bordered"
              onPress={() => onNavigate({ page: 'organization' })}
            >
              Back
            </Button>
            <Button
              color="primary"
              onPress={onOpen}
              isDisabled={selectedPlan?.name === currentPlan}
            >
              Change Plan
            </Button>
          </div>
        
      </section>

      {/* Plan Information Section */}
      <section>
        
          <h2 className="text-xl font-bold mb-4">Subscription Plans Information</h2>

          <div className="space-y-6">
            {/* Additional Resources Info */}
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-primary">Need more resources?</p>
                  <p>Add more Aircraft & Resources for just <span className="font-semibold">$5 per month!</span></p>
                  <p>Add more locations for just <span className="font-semibold">$10 per month.</span></p>
                </div>
              </div>
            </div>

            {/* Included Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">All Accounts Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Coming Soon Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Coming Soon:</h3>
              <div className="space-y-2">
                {upcomingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Chip color="warning" variant="flat" size="sm">Coming Soon</Chip>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* Plan Descriptions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Level For Your Organization</h3>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div key={plan.name} className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{plan.name}</h4>
                      <p className="text-default-500">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">${plan.monthlyPrice.toFixed(2)}/month</div>
                      <div className="text-sm text-default-500">or ${plan.basePrice.toFixed(2)}/year</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
      </section>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirm Plan Change</ModalHeader>
              <ModalBody>
                {selectedPlan && (
                  <p>
                    Are you sure you want to change your subscription to the {selectedPlan.name} plan?
                    This will adjust your billing to ${selectedPlan.totalPrice.toFixed(2)} per year.
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleConfirmChange}>
                  Confirm Change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}