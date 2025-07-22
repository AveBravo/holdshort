import { Users, UserPlus, Boxes, CreditCard, Building2, Lock, Plane, Navigation, Shield, LogIn, Clock } from 'lucide-react';

export const screenshots = {
  app: [
    {
      url: "/src/assets/img/app1.png",
      alt: "Mobile app flight booking screen",
      title: "Mobile Flight Booking"
    },
    {
      url: "/src/assets/img/Modal.png",
      alt: "Mobile checklist interface",
      title: "Digital Checklists"
    },
    {
      url: "/src/assets/img/appModal.png",
      alt: "Weather briefing mobile view",
      title: "Weather Updates"
    },
    {
      url: "/src/assets/img/app1.png",
      alt: "Flight tracking screen",
      title: "Real-time Flight Tracking"
    },
    {
      url: "/src/assets/img/Modal.png",
      alt: "Maintenance logging screen",
      title: "Maintenance Logging"
    }
  ],
  web: [
    {
      url: "/src/assets/img/web1.png",
      alt: "Dashboard view showing flight scheduling calendar",
      title: "Intuitive Scheduling Dashboard",
    },
    {
      url: "/src/assets/img/web2.png",
      alt: "Aircraft management interface",
      title: "Aircraft Fleet Management"
    },
    {
      url: "/src/assets/img/web1.png",
      alt: "Pilot profile and certifications page",
      title: "Pilot Certification Tracking"
    },
    {
      url: "/src/assets/img/web2.png",
      alt: "Flight planning interface",
      title: "Advanced Flight Planning"
    },
    {
      url: "/src/assets/img/web1.png",
      alt: "Analytics dashboard",
      title: "Performance Analytics"
    }
  ]
};

export const benefits = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Add unlimited pilots",
    description: "Add an unlimited number of pilots or users to your organization"
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "Unlimited instructors",
    description: "Add an unlimited number of instructors at no charge!"
  },
  {
    icon: <Boxes className="w-6 h-6" />,
    title: "Custom resources",
    description: "Add custom resource types for your specific needs"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Multiple locations",
    description: "Add multiple airport locations and different time zones"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Access control",
    description: "Control access to resources by pilot qualifications"
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "FAA compliance",
    description: "Enforce FAA regulations across your operations"
  },
  {
    icon: <Navigation className="w-6 h-6" />,
    title: "Find flight centers",
    description: "Find the nearest flight center with ease"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Pilot verification",
    description: "Create an account with your pilot ratings and certificates"
  },
  {
    icon: <LogIn className="w-6 h-6" />,
    title: "Easy onboarding",
    description: "Easily join an existing flight organization"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Booking",
    description: "Reserve aircraft online, 24/7 via any web browser or app"
  }
];

export const features = [
  {
    title: "Compliance",
    icon: <Shield className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80",
    description: "Our aircraft scheduling software offers comprehensive enforcement capabilities including Certificates, Ratings, FAA Flight Review, Medical, Organization Review, and Renter's Insurance verification. The integrated tach & meter tracking system automatically notifies you of upcoming maintenance inspections.",
    imageAlt: "Aircraft maintenance hangar with multiple planes"
  },
  {
    title: "Versatility",
    icon: <Plane className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1200&q=80",
    description: "Experience multi-tier role management with fully customizable resource distribution between managers, instructors, pilots, and students. Beyond standard aircraft and instructor scheduling, add custom resources like equipment and staff for complete operational control.",
    imageAlt: "Aircraft model with globe"
  },
  {
    title: "Invoicing",
    icon: <CreditCard className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    description: "Integrated with Stripe.com for secure payment processing, our system enables comprehensive invoice management for flights and products. Combined with our scheduling features, it creates an all-in-one solution for your flight operations.",
    imageAlt: "Payment terminal"
  }
];

export const about = 
  {
    image: "/src/assets/img/caleb-woods-R2lCJwGyqPQ-unsplash.jpg",
  desc: "Our next generation online aircraft scheduling software provides a complete flight and pilot scheduling management solution to flying clubs, flight schools, FBOs, corporate flight departments, air carriers and charter operators.",
  desc2: "We are the premier online flight school software solution that has been developed with the specific needs of operators and business owners in mind. Our scheduling platform provides a complete online and app-based aircraft reservation solutions which provides the administrator complete control over their user's access and reservation authority.",
    subdesc: "Organizations may now also seamlessly manage multiple locations from a single account. In addition, the scheduling system maintains complete pilot records for verification and compliance purposes prior to flight dispatch.",
  title: "About Us",
    alt:"Flight instructor teaching a student pilot"
}
  
export const plans = [
  {
    name: "Shared Plane",
    icon: <Plane className="w-6 h-6" />,
    price: "$10.00",
    yearlyPrice: "$110",
    color: "text-green-500",
    borderColor: "group-hover:border-green-500",
    features: {
      resources: "1 Aircraft & Other Resource",
      users: "Unlimited Instructors, Pilots & Users",
      locations: "1 Location (Airport, Office, etc.)",
    },
    savings: "$10.00",
    popular: false
  },
  {
    name: "Flying Club",
    icon: <Users className="w-6 h-6" />,
    price: "$30.00",
    yearlyPrice: "$330",
    color: "text-blue-500",
    borderColor: "group-hover:border-blue-500",
    features: {
      resources: "Up to 5 Aircraft & Other Resources",
      users: "Unlimited Instructors, Pilots & Users",
      locations: "1 Location (Airport, Office, etc.)",
    },
    savings: "$30.00",
    popular: true
  },
  {
    name: "Flight School",
    icon: <Plane className="w-6 h-6" />,
    price: "$55.00",
    yearlyPrice: "$605",
    color: "text-amber-500",
    borderColor: "group-hover:border-amber-500",
    features: {
      resources: "Up to 10 Aircraft & Other Resources",
      users: "Unlimited Instructors, Pilots & Users",
      locations: "Up to 2 Locations (Airport, Office, etc.)",
    },
    savings: "$55.00",
    popular: false
  },
  {
    name: "Enterprise",
    icon: <Building2 className="w-6 h-6" />,
    price: "$499.00",
    yearlyPrice: "$5489",
    color: "text-pink-500",
    borderColor: "group-hover:border-pink-500",
    features: {
      resources: "Unlimited Aircraft & Other Resources",
      users: "Unlimited Instructors, Pilots & Users",
      locations: "Unlimited Locations (Airport, Office, etc.)",
    },
    savings: "$499.00",
    popular: false
  }
];

export const locations = [
  { id: 1, name: 'Farmingdale', code: 'FRG', country: 'United States', state: 'NY', timezone: 'America/New_York' },
  { id: 2, name: 'New York', code: 'LGA', country: 'United States', state: 'NY', timezone: 'America/New_York' },
  { id: 3, name: 'Днепро', code: 'KBP', country: 'Ukraine', state: 'DN', timezone: 'Europe/Kiev' },
  { id: 4, name: 'Офис', code: '###', country: 'Russia', state: 'MS', timezone: 'Europe/Moscow' },
  { id: 5, name: 'Штаб', code: 'SDAS', country: 'Kazakhstan', state: 'AL', timezone: 'Asia/Almaty' },
];

export const services = [
  { label: 'Aircraft Inspection', value: 'inspection' },
  { label: 'Aircraft Rental', value: 'rental' },
  { label: 'Flight Training', value: 'flight_training' },
  { label: 'Ground Training', value: 'ground_training' },
  { label: 'Repair Airframe', value: 'repair_airframe' },
  { label: 'Repair Powerplant', value: 'repair_powerplant' },
  { label: 'Sightseeing Tours', value: 'sightseeing' },
  { label: 'Simulator Training', value: 'simulator' },
];

export const timezones = [
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Europe/Kiev', value: 'Europe/Kiev' },
  { label: 'Europe/Moscow', value: 'Europe/Moscow' },
  { label: 'Asia/Almaty', value: 'Asia/Almaty' },
];

export const countries = [
  { label: 'United States', value: 'US' },
  { label: 'Ukraine', value: 'UA' },
  { label: 'Russia', value: 'RU' },
  { label: 'Kazakhstan', value: 'KZ' },
];

  