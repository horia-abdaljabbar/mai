import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import DataTable from '../components/Tables/ClientTable';
import { Footer } from "@/widgets/layout";
import DrawerTopPlacement from "@/components/Tables/Packge/Topdrawer";
import TabsCustomAnimation from '../components/Tables/tabs';

export function Clients() {
  const [openTop, setOpenTop] = useState(false); 
  const openDrawerTop = () => setOpenTop(true); // Function to open the drawer
  const closeDrawerTop = () => setOpenTop(false);

  return (
    <>
      <section className="relative block h-[1vh]">
      <DrawerTopPlacement  openDrawerTop={openTop} closeDrawerTop={closeDrawerTop} />
      </section>
 
   

      {/* Page Content */}
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute right-0 top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover" />
        <div className="absolute top-0 right-0 h-full w-full bg-cover" />
      </section>
    
      <section className="relative bg-white py-16">
        <div className="-mt-40 bg-white break-words flex flex-col justify-center mb-10 min-w-0 relative w-full">
          <div className="text-center mt-10 mb-10">
            <Typography variant="h2" color="blue-gray">
              السجلات 
            </Typography>
          </div>
        
          <div className="flex justify-center mb-6">
           
          </div>

          <div className="justify-center flex w-full">
            {/* Pass openDrawerTop function to TabsCustomAnimation */}
            <TabsCustomAnimation openDrawerTop={openDrawerTop} />
          </div>
          
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Clients;
