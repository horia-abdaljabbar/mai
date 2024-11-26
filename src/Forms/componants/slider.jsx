import React, { useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import Slider from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import packages from "../../components/packageData";

export function PackageSlide() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Programmatically click the left arrow
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl max-h-screen-xl p-8 flex-col">
      <Slider ref={sliderRef} {...settings}>
        {packages.map((pkg, index) => (
          <Card key={index} className="max-w-xs mx-11 shadow-lg">
            <CardHeader floated={true} color="blue-gray">
              <img src="/img/background-3.png" alt="background" />
            </CardHeader>
            <CardBody>
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  color="blue-gray"
                  className="flex items-center gap-1.5 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  5.0
                </Typography>
                <Typography variant="h6" color="blue-gray" className="font-medium">
                  {pkg.title}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h6" color="blue-gray" className="font-medium">
                  {pkg.hotel_makkah}
                </Typography>
                <Typography color="blue-gray" className="flex items-center gap-1.5 font-light">
                  {pkg.location_makkah}
                </Typography>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <Typography variant="h6" color="blue-gray" className="font-black">
                  {pkg.hotel_madina}
                </Typography>
                <Typography color="blue-gray" className="flex items-end gap-2.5 black">
                  {pkg.location_madina}
                </Typography>
              </div>
              <div className="flex items-center justify-center">
                <Typography variant="h6" color="blue-gray" className="font-black">
                  {pkg.room_choice}
                </Typography>
              </div>
              <div className="group mt-4 inline-flex flex-wrap items-center gap-3">
                {pkg.rooms.map((room, roomIndex) => (
                  <Tooltip key={roomIndex} content={`${room.price} ${room.days}`}>
                    <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                      <img
                        src={`public/img/${room.type.split(" ")[0]}.svg`}
                        alt={`Icon ${room.type}`}
                        className="h-5 w-5"
                      />
                    </span>
                  </Tooltip>
                ))}
              </div>
            </CardBody>
            <CardFooter className="pt-3">
              <Button size="lg" fullWidth={true}>
                حجز
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`${className} left-0  `}
    onClick={onClick}
    >
    <Button
  className={` !absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[100px] h-12 max-h-[100px] text-black bg-white/10 hover:bg-black hover:text-white active:bg-black flex items-center justify-center`}
 
 
>
  <ChevronRightIcon strokeWidth={3} className="h-5 w-5 " /> {/* Adjust size here if needed */}
</Button>
</div>
    
  );
}

// Custom previous arrow component
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
    className={`${className}  `}
    >
    <Button
  className={` !absolute top-2/4 Right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 max-w-[100px] h-12 max-h-[100px] text-black bg-white/10 hover:bg-black hover:text-white active:bg-black flex items-center justify-center`}
 
  onClick={onClick}
>
  <ChevronLeftIcon strokeWidth={3} className="h-5 w-5 " /> {/* Adjust size here if needed */}
</Button>
</div>
  );
}

export default PackageSlide;
