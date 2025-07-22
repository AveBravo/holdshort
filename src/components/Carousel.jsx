import React, { useRef, useState } from "react";
import { Tabs, Tab, Card, CardBody, Image, Button } from "@heroui/react";
import { Monitor, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { appScreenshots } from "../data";

export default function ScreensSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const mobileSliderRef = useRef(null);
  const webSliderRef = useRef(null);

  const handleMouseDown = (e, ref) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const scroll = (direction, ref) => {
    if (!ref.current) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Our Platform
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how our intuitive interfaces make flight management
            effortless
          </p>
        </div>

        <Tabs
          aria-label="Platform Screenshots"
          color="primary"
          variant="bordered"
          classNames={{
            tabList: "gap-6",
            tab: "h-14",
            cursor: "bg-primary",
            tabContent: "group-data-[selected=true]:text-white",
            panel: "overflow-visible pt-6",
          }}
        >
          <Tab
            key="mobile"
            title={
              <div className="flex items-center space-x-2">
                <div className="text-default-500 group-data-[selected=true]:text-white">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span>App Screenshots</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <div className="relative">
                  <Button
                    isIconOnly
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                    onPress={() => scroll("left", mobileSliderRef)}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    isIconOnly
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                    onPress={() => scroll("right", mobileSliderRef)}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                  <div
                    ref={mobileSliderRef}
                    className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
                    onMouseDown={(e) => handleMouseDown(e, mobileSliderRef)}
                    onMouseMove={(e) => handleMouseMove(e, mobileSliderRef)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    {appScreenshots.map((screenshot, index) => (
                      <Card
                        key={index}
                        className="border-none flex-none w-[300px] snap-center"
                        isHoverable
                      >
                        <CardBody className="p-0">
                          <div className="relative group">
                            <Image
                              isBlurred
                              src={screenshot.url}
                              alt={screenshot.alt}
                              draggable={false}
                              classNames={{
                                wrapper: "aspect-[9/16] overflow-hidden",
                                img: "object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <h3 className="text-xl font-bold">
                                {screenshot.title}
                              </h3>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="web"
            title={
              <div className="flex items-center space-x-2">
                <div className="text-default-500 group-data-[selected=true]:text-white">
                  <Monitor className="w-6 h-6" />
                </div>
                <span>Web Screenshots</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <div className="relative">
                  <Button
                    isIconOnly
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                    onPress={() => scroll("left", webSliderRef)}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    isIconOnly
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                    onPress={() => scroll("right", webSliderRef)}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                  <div
                    ref={webSliderRef}
                    className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
                    onMouseDown={(e) => handleMouseDown(e, webSliderRef)}
                    onMouseMove={(e) => handleMouseMove(e, webSliderRef)}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                  >
                    {webScreenshots.map((screenshot, index) => (
                      <Card
                        key={index}
                        className="border-none flex-none w-[800px] snap-center"
                        isHoverable
                      >
                        <CardBody className="p-0">
                          <div className="relative group">
                            <Image
                              isBlurred
                              src={screenshot.url}
                              alt={screenshot.alt}
                              draggable={false}
                              classNames={{
                                wrapper: "aspect-video overflow-hidden",
                                img: "object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300",
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <h3 className="text-xl font-bold">
                                {screenshot.title}
                              </h3>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
