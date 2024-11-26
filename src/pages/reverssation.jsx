import {  Typography, Button } from "@material-tailwind/react";
import ReverssationTabs from "@/components/Tables/Reverssation/ReverssationTabs";
import { Footer } from "@/widgets/layout";

export function Reverssation() {

  return (
    <>

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute right-0 top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover " />
        <div className="absolute top-0 right-0 h-full w-full  bg-cover" />
      </section>
      <section className="relative bg-white py-16">
        <div className="-mt-40 bg-white break-words flex flex-col justify-center mb-10 min-w-0 relative w-full ">
          <div className="">
            <div className="">
              <div className="relative text-center">
            
                <div className="flex flex-col mt-10 mb-10">
                  <Typography variant="h2" color="blue-gray">
        الحجوزات
                  </Typography>
                 
                </div>
              </div>

            </div>
            </div>
            <div className=" justify-center flex  table-auto w-full border-none">
            <ReverssationTabs/>
    </div>
           </div>

         
    
               
               
               
    

             
            
          
           


    
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Reverssation;
