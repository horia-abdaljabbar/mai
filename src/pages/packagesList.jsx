import { Typography, Button } from "@material-tailwind/react";
import ReverssationTabs from "@/components/Tables/Reverssation/ReverssationTabs";
import { Footer } from "@/widgets/layout";
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import AppGrid from "@/Forms/componants/grid";


export function PackagesList() {
  const layoutConfig = [
    { i: 'item1', x: 0, y: 0, w: 2, h: 3 },
    { i: 'item2', x: 2, y: 0, w: 4, h: 3 },
    { i: 'item3', x: 6, y: 0, w: 2, h: 3 },
    { i: 'item4', x: 6, y: 0, w: 2, h: 3 }
  ];

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute right-0 top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover " />
        <div className="absolute top-0 right-0 h-full w-full  bg-cover" />
      </section>
      <section className="relative bg-white py-16 min-h-screen">
        <div className="-mt-40 bg-white break-words flex flex-col justify-center mb-10 min-w-0 relative w-full ">
          <div className="relative text-center">
            <div className="flex flex-col mt-10 mb-10">
              <Typography variant="h2" color="blue-gray">
                قائمة البكجات
              </Typography>
            </div>
          </div>

          {/* Full Page Grid */}
          <div className="flex justify-center items-center w-full h-[calc(100vh-160px)]">
            <AppGrid />
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default PackagesList;
