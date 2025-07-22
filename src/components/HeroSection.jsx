// import React from 'react';
// import { Button, Card, Image } from "@heroui/react";
// import { Play, Calendar, ChevronDown } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <div className="relative min-h-[90vh] flex items-center">
//       {/* Video Background */}
//       <div className="absolute inset-0 overflow-hidden" style={{ backgroundImage: 'url(/src/assets/img/airplane-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
//         {/* <iframe
//           className="absolute top-0 left-0 w-full h-full"
//           src="https://www.youtube.com/embed/EAzfXE_A5Tg?autoplay=1&mute=1&loop=1&playlist=EAzfXE_A5Tg"
//           title="YouTube video player"
//           allow="autoplay; fullscreen"
//         ></iframe> */}
//         <Image
//           className="absolute top-0 left-0 w-full h-full object-cover"
//           src="/src/assets/img/airplane-bg.png"
//           alt="Background"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
//       </div>

//       {/* Main Content */}
//       <div className="relative max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12">
//         <div className="space-y-8">
//           <div className="space-y-4">
//             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
//               Your Journey to the
//               <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
//                 Skies Begins Here
//               </span>
//             </h1>
//             <p className="text-xl text-gray-300 max-w-xl">
//               Experience world-class flight training with state-of-the-art aircraft and expert instructors.
//               Start your aviation career today.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <Button
//               size="lg"
//               color="primary"
//               endContent={<Calendar className="w-4 h-4" />}
//               className="font-semibold"
//             >
//               Schedule Trial Flight
//             </Button>
//             <Button
//               size="lg"
//               variant="bordered"
//               className="text-white border-white font-semibold"
//               endContent={<Play className="w-4 h-4" />}
//             >
//               Watch Our Story
//             </Button>
//           </div>

//           <div className="flex items-center gap-6 text-gray-300">
//             <div className="flex -space-x-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <img
//                   key={i}
//                   src={`https://i.pravatar.cc/150?img=${i + 10}`}
//                   alt={`Student ${i}`}
//                   className="w-10 h-10 rounded-full border-2 border-white"
//                 />
//               ))}
//             </div>
//             <div>
//               <p className="font-semibold">Join 500+ Student Pilots</p>
//               <p className="text-sm">Who chose us for their training</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Card */}
//         <div className="flex items-center justify-center">
//           <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 w-full max-w-md">
//             <div className="grid grid-cols-2 gap-8">
//               {[
//                 { value: "20+", label: "Aircraft Fleet" },
//                 { value: "50+", label: "Certified Instructors" },
//                 { value: "15K+", label: "Flight Hours" },
//                 { value: "99%", label: "Success Rate" }
//               ].map((stat, i) => (
//                 <div key={i} className="text-center">
//                   <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
//                   <p className="text-gray-300 text-sm">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-sm font-medium">Scroll to explore</p>
//           <ChevronDown className="w-6 h-6" />
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { Button, Badge } from "@heroui/react";
import { Plane } from 'lucide-react';
import RotatingText from './RotatingText';

const HeroSection = () => {
  return (
    <div className="px-6 pt-16 pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-8 dark:text-gray-400 dark:border-gray-600">
          ✨ Voted #1 hottest product ✨
        </Badge>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
        <span className='font-thin'>Use our apps to</span> <br /><span className='font-bold'>schedule a plane</span><span className="inline-flex items-center">✈️</span>
          <br />
        <RotatingText
          texts={['anytime', 'anywhere']}
          mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center dark:text-white"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.040}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        For Flight Schools, Flying Clubs, FBOs, Aircraft Partnerships and General Aviation
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button color="primary" size="lg" className="flex items-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800">
            Start with Holdshort
            <Plane className="w-5 h-5 dark:text-white" />
          </Button>
          <Button color="default" variant="bordered" size="lg" className="dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800">
            Try a Demo
          </Button>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="relative rounded-2xl overflow-hidden h-[580px]">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-white/90 dark:from-gray-800/90 to-transparent" />
            
            <img
              src="/calendar.png"
              alt="Calendar"
              className="absolute inset-0 w-full h-full object-fill dark:hidden"
            />
            <img
              src="/calendar-dark.png"
              alt="Calendar"
              className="absolute inset-0 w-full h-full object-fill hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;