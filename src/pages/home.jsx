import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import Country from "./country";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";


export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full  bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-full">
              <Typography
                variant="h1"
                color="white"
                className="mb-5  text-xl lg:text-4xl"

              >
             تسجيل العملاء والاحتفاظ بجميع البيانات 
             الكترونيا
              </Typography>
              <Typography variant="h1" color="white" className="opacity-80 mb-2  text-xl lg:text-4xl">
             من الضياع والخراب 
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
               شركة اليونس للسياحة والسفر والحج والعمرة
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              نحن فخورون بالإعلان عن افتتاح قسم السياحة والسفر في شركتنا. 
                <br />
                <br />
                نقدم مجموعة متنوعة من الخدمات السياحية بما في ذلك رحلات سياحية ممتعة، حجوزات فنادق رائعة، ترتيب تذاكر الطيران، والمزيد. نسعى دائمًا لتقديم تجارب سفر فريدة ومميزة لعملائنا
              </Typography>
              <Button variant="filled">قراءه المزيد</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0  ">
              <Card className="shadow-lg border shadow-black-800/4 rounded-lg bg-white bg-opacity-10">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/logo.jpg"
                    className="h-full w-full"
                  />
                </CardHeader>
              
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto">
          <PageTitle section="الموردون" heading="هنا الشركات المورده">
           هذه الشركات تساعدنا في توفير افضل البكجات والعروض لتمتع برحله رائعه ومريحة
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                // // socials={
                // //   <div className="flex items-center gap-2">
                // //     {socials.map(({ color, name }) => (
                // //       <IconButton key={name} color={color} variant="text">
                // //         <i className={`fa-brands text-xl fa-${name}`} />
                // //       </IconButton>
                // //     ))}
                // //   </div>
                // }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-15 px-4">
        <div className="container mx-auto">
          <PageTitle section="" heading="سبب اختيار هذه الشركات">
           لانها توفر مجموعه من الخدمات اهمها
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
              <Card
                key={title}
                color="transparent"
                shadow={false}
                className="text-center text-blue-gray-900"
              >
                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                  {React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                </div>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {title}
                </Typography>
                <Typography className="font-normal text-blue-gray-500">
                  {description}
                </Typography>
              </Card>
            ))}
          </div>
          <PageTitle section="تواصل معنا" heading="هل تريد التواصل?">
           الرجاء تعبئة هذا النموذج وسيتم الرد خلال 24 ساعه
          </PageTitle>
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="الاسم كامل" />
              <Input variant="outlined" size="lg" label="البريد الالكتروني" />
            </div>
            <Textarea variant="outlined" size="lg" label="الرسالة" rows={8} />
           
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
             ارسال 
            </Button>
          </form>
        </div>
      </section>
      <div className="bg-white py-15">
        <Footer />
      </div>
    </>
  );
}

export default Home;
