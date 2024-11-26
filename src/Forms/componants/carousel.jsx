import { Carousel } from "@material-tailwind/react";
import { CardPackages } from "../packageCard";

export function CarouselCustomNavigation() {
  const packages = CardPackages(); // Assuming CardPackages returns an array of package data

  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {packages.map((pkg, index) => (
        <div key={index} className="carousel-slide">
          {/* Render your package card for each slide */}
          {pkg}
        </div>
      ))}
    </Carousel>
  );
}
