
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Tooltip } from "@material-tailwind/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PackageSlide } from "./componants/slider";


export function CardPackages() {
  // Slider settings for the carousel
 
  return (
    
    <div className="flex flex-col w-full gap-10 mb-1 mr-18 p-4 relative">
    <Typography variant="h3" color="blue-gray" className="text-center text-xl lg:text-xl">
    تحديد تفاصيل البكج
    </Typography>

    <div className="mt-8 flex justify-end">
    
      </div>

<PackageSlide/>
      
    </div>
  );
}

