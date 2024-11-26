import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
 import BusReverssationTable from "./BussReversation";
import VisaReservationTable from "./VissaReverssationTable";
import FlightReservationTable from "./FlightReverssation";
import HotelReservationTable from "./HotelReverssation";
  export default function ReverssationTabs() {
    const busData = [
      {
        رقم_الباص: "1234",
        نوع_الباص: "مكيف",
        عدد_المقاعد: 45,
        موقع_الانطلاق: "الرياض",
        موقع_التوقف: "جدة",
        تعديل: "تعديل",
        حذف: "حذف"
      },
      {
        رقم_الباص: "5678",
        نوع_الباص: "غير مكيف",
        عدد_المقاعد: 40,
        موقع_الانطلاق: "الدمام",
        موقع_التوقف: "الخبر",
        تعديل: "تعديل",
        حذف: "حذف"
      },
      {
        رقم_الباص: "9101",
        نوع_الباص: "فاخر",
        عدد_المقاعد: 30,
        موقع_الانطلاق: "مكة المكرمة",
        موقع_التوقف: "المدينة المنورة",
        تعديل: "تعديل",
        حذف: "حذف"
      }
    ];
    
    const visaData = [
      {
 "نوع_الفيزا": "عمل",
        "تاريخ_التطبيق": "2024-01-20",
        "تاريخ_التامين": "2024-03-01",
        "تاريخ_الانتهاء": "2024-03-30",
        "رقم_الفيزا": "987654321",
        "الدولة_المعنية": "الإمارات",
        "تكلفة_الفيزا": "300 دولار",
        "ملاحظات_اضافية": "تأشيرة طويلة الأمد",
        "إجراء": "عرض",
        "حذف": "حذف"
      },
      {
        "نوع_الفيزا": "عمل",
        "تاريخ_التطبيق": "2024-01-20",
        "تاريخ_التامين": "2024-03-01",
        "تاريخ_الانتهاء": "2024-03-30",
        "رقم_الفيزا": "987654321",
        "الدولة_المعنية": "الإمارات",
        "تكلفة_الفيزا": "300 دولار",
        "ملاحظات_اضافية": "تأشيرة طويلة الأمد",
        "إجراء": "عرض",
        "حذف": "حذف"
      }
    ];
    const flightData=[
      {
          "رحلة_الطيران": "XY123",
          "رقم_التذكرة": "A123456789",
          "الخطوط_الجوية": "الخطوط السعودية",
          "من": "الرياض",
          "إلى": "جدة",
          "المغادرة": "08:00",
          "الوصول": "10:30",
          "تاريخ_الرحلة": "2024-11-01",
          "الدرجة": "اقتصادية",
          "عدد_التوقفات": "مباشر",
          "الطائرة": "بوينغ 777",
          "الأمتعة": "30 كغم"
      },
      {
          "رحلة_الطيران": "QR456",
          "رقم_التذكرة": "B987654321",
          "الخطوط_الجوية": "الخطوط الجوية القطرية",
          "من": "الدوحة",
          "إلى": "دبي",
          "المغادرة": "12:15",
          "الوصول": "14:45",
          "تاريخ_الرحلة": "2024-11-02",
          "الدرجة": "درجة الأعمال",
          "عدد_التوقفات": "مباشر",
          "الطائرة": "إيرباص A380",
          "الأمتعة": "40 كغم"
      },
      {
          "رحلة_الطيران": "EK789",
          "رقم_التذكرة": "C123456789",
          "الخطوط_الجوية": "طيران الإمارات",
          "من": "دبي",
          "إلى": "نيويورك",
          "المغادرة": "09:00",
          "الوصول": "17:00",
          "تاريخ_الرحلة": "2024-11-05",
          "الدرجة": "الدرجة الأولى",
          "عدد_التوقفات": "توقف واحد",
          "الطائرة": "بوينغ 777",
          "الأمتعة": "50 كغم"
      }
  ]
  const hotels= [
    {
      "HotelId": "12345",
      "HotelName": "فندق الخليج",
      "HotelRating": 4,
      "CountryId": "AE",
      "CityId": "DXB",
      "Region": "وسط المدينة",
      "HotelURL": "https://example.com/gulfhotel",
      "BookingProfileURL": "https://example.com/gulfhotel/booking",
      "DistanceFromCenter": 2.3,
      "DistanceDescription": "2.3 كم من وسط المدينة"
    },
    {
      "HotelId": "67890",
      "HotelName": "فندق النخيل",
      "HotelRating": 4.0,
      "CountryId": "SA",
      "CityId": "RUH",
      "Region": "الحي المالي",
      "HotelURL": "https://example.com/palmhotel",
      "BookingProfileURL": "https://example.com/palmhotel/booking",
      "DistanceFromCenter": 1.5,
      "DistanceDescription": "1.5 كم من الحي المالي"
    }
  ]
  
    const data = [
      {
        label: "حجز الباصات",
        value: "html",
        table: (
           <BusReverssationTable data={busData} className='table-auto w-full border-collapse border text-right border-gray-400'/>
        ),
      },
      {
        label: "حجز طيران",
        value: "flight",
        table: (
           <FlightReservationTable data={flightData} className='table-auto w-full border-collapse border text-right border-gray-400'/>
        ),
      },
      {
        label: "حجز مواصلات داخلية",
        value: "react",
        table: (
            <table className="table-auto overflow-hidden border-collapse text-right border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Directives</td>
                <td className="border border-gray-300 p-2">Special tokens in the template to manipulate DOM</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Reactivity</td>
                <td className="border border-gray-300 p-2">Data-driven rendering</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        label: "حجز الفنادق",
        value: "vue",
        table: (
          <HotelReservationTable data={hotels} className='table-auto w-full border-collapse border text-right border-gray-400'/>
        ),
      },
      {
        label:"حجز التامين الصحي",
        value: "angular",
        table: (
          <table className="table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Feature</th>
                <th className="border border-gray-300 p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Modules</td>
                <td className="border border-gray-300 p-2">Encapsulates code into cohesive blocks</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Services</td>
                <td className="border border-gray-300 p-2">Provides reusable business logic</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        label: "حجز الفيزا ",
        value: "",
        table: (
          <VisaReservationTable data={visaData} className='table-auto w-full border-collapse border text-right border-gray-400'/>

        ),
      }
    ];
  
    return (
      <Tabs id="custom-animation " value="html" className='relative'>
        <TabsHeader className="relative z-0">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, table }) => (
            <TabPanel key={value} value={value}>
              {table}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }
  