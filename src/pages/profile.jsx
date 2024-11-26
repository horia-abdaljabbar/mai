import { Typography } from "@material-tailwind/react";
 
import ExpandedStages from "@/components/expandedStages";
import { Footer } from "@/widgets/layout";
import { CardPackages } from "@/Forms/packageCard";
import SpesificDatePicker from "@/Forms/componants/package/componant/selectdate";

export function Profile() {
  return (
    <>

      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute right-0 top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover " />
        <div className="absolute top-0  h-full w-full  bg-cover" />
      </section>
      <section className="relative bg-white py-16">
        <div className="-mt-40 bg-white break-words flex flex-col justify-center mb-10 min-w-0 relative w-full ">
          <div className="">
         
              <div className="relative text-center">
            
                <div className="flex flex-col mt-10">
                  <Typography variant="h2" color="blue-gray">
                   تسجيل عميل جديد
                  </Typography>
                 
                </div>
              

            </div>
            </div>
          
           <ExpandedStages/>
           
      

             
             
              </div>
             
             
             
            
          
           


    
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
