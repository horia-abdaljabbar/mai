import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import  DataTable from './ClientTable'
import PassportTable from "./PassportTable";
import React ,{useEffect} from "react";
import PackageTable from '../Tables/Packge/packageTable'
import getAllCustomerProfiles from '../../controllers/CustomerProfileApis/getAllCustomerProfiles'
import getAllPassports from "@/controllers/PassportApis/getAllPassports";
import { toast } from 'react-hot-toast';
import styled from 'styled-components';


export default function TabsCustomAnimation() {
  const apiKey = '7f6fbdfd-a6ca-4af3-ae7e-10bd2972cb5f';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmI5ZmMzOC1jMWMwLTRjMjctYTgyMi1kY2U3NWU3NTdkNGYiLCJFbWFpbCI6InlvdW5lcy5raGRlaXJAZ21haWwuY29tIiwiUGhvbmVOdW1iZXIiOiI5NzA1OTczMDM3MTgiLCJqdGkiOiJmOTExYjk2Yi1jNGZhLTRlNTQtODc4Zi0xYzU1ZjM0YWMzMjMiLCJyb2xlIjpbIkJhc2ljIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sIk1lbWJlcnMiOlsiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIkdldE1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCIsIkdldExpc3RNZW1iZXJzIiwiTWVtYmVyRXhpc3RzQnlVc2VySWQiLCJNZW1iZXJFeGlzdHNUb2tlbiIsIkRlbGV0ZU1lbWJlciIsIkFkZE1lbWJlciIsIkdldE1lbWJlckJ5VXNlcklkIiwiR2V0TWVtYmVyIiwiR2V0T2Zmc3ByaW5nTWVtYmVycyIsIlVwZGF0ZU1lbWJlciIsIlVwZGF0ZU1lbWJlclZpZXdNb2RlbCJdLCJQYXltZW50IjpbIkNyZWF0ZVBheW1lbnRPbmVUaW1lIiwiQ3JlYXRlUGF5bWVudFJlY3VycmluZyIsIkNhbGN1bGF0ZVN1YnNjcmlwdGlvbiIsIlRyaWdnZXJQcm9maXRQcm9jZXNzaW5nIiwiQ3JlYXRlUGF5bWVudE9uZVRpbWUiLCJDcmVhdGVQYXltZW50UmVjdXJyaW5nIiwiVHJpZ2dlclBheW1lbnRQcm9jZXNzaW5nIiwiQ2FsY3VsYXRlU3Vic2NyaXB0aW9uIl0sIk1haWxsaW5nIjpbIlNlbmRNYWlsIiwiU2VuZE1haWwiXSwiTW9udGhseVN1YnNjcmlwdGlvblBheW1lbnRzIjpbIkdldE1vbnRobHlTdWJzY3JpcHRpb25QYXltZW50c0xpc3QiLCJHZXRNb250aGx5U3Vic2NyaXB0aW9uUGF5bWVudHNMaXN0Il0sIkFjY291bnRDb250cm9sbGVyIjpbIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSIsIlNlbmRTbXNUb0NvbmZpcm1QaG9uZSIsIkNvbmZpcm1QaG9uZSJdLCJBZG1pbmlzdHJhdGlvbiI6WyJDcmVhdGVSb2xlIiwiTGlzdFJvbGVzIiwiR2V0Um9sZXMiLCJHZXRVc2Vyc0luUm9sZSIsIkxpc3RVc2VycyIsIkdldFVzZXJzIiwiRGVsZXRlVXNlcnMiLCJEZWxldGVSb2xlIiwiR2V0TWFuYWdlUm9sZUNsYWltcyIsIlNldE1hbmFnZVJvbGVDbGFpbXMiLCJHZXRSb2xlc0luVXNlciIsIlNldFJvbGVzSW5Vc2VyIiwiU2V0Um9sZXNOYW1lIiwiVXBkYXRlVXNlcnMiLCJTZXRVc2Vyc0luUm9sZSJdLCJDbGFzc2lmaWNhdGlvblBheW1lbnQiOlsiR2V0TGlzdENsYXNzaWZpY2F0aW9uIiwiR2V0Q2xhc3NpZmljYXRpb24iLCJTZXRDbGFzc2lmaWNhdGlvbiIsIkFkZENsYXNzaWZpY2F0aW9uIiwiRGVsZXRlQ2xhc3NpZmljYXRpb24iXSwiU21zQ29udHJvbGxlciI6WyJTZW5kU21zIiwiR2V0QmFsYW5jZSJdLCJuYmYiOjE3MzA0OTA3ODgsImV4cCI6MTczMDQ5MTY4OCwiaWF0IjoxNzMwNDkwNzg4LCJpc3MiOiJNdWx0aVNvbHV0aW9uU2VjdXJlQXBpIiwiYXVkIjoiTXVsdGlTb2x1dGlvblNlY3VyZUFwaVVzZXIifQ.gtIcWH4YhV9EqyxmVD_HFp9hmsH3LIzXErbJmovRmYo';
  // const tableData = [
  //     { id: '#1', fullname: 'Damilare Anjorin', email: 'damilareanjorin1@gmail.com', phone: '+2348106420637', status: 'active', createdAt: 'September 12' },
  //     { id: '#2', fullname: 'Jane Doe', email: 'jane.doe@example.com', phone: '+1234567890', status: 'not active', createdAt: 'August 15' },
  //     { id: '#3', fullname: 'John Smith', email: 'john.smith@example.com', phone: '+9876543210', status: 'disabled', createdAt: 'July 10' },

  //   ];

  /////get all customers api:::
  const [tableData, setTableData] = React.useState([]);
  const [passwordTableData, setPasswordTableData] =  React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');

/*start get all api*/

useEffect(() => {
  // Function to fetch customer and passport data
  const fetchData = async () => {
    try {
      setLoading(true);
      setLoadingMessage("جاري تحميل معلومات العملاء...");
      // Fetch customer profiles and passports
      const customers = await getAllCustomerProfiles(apiKey, token);
      setLoadingMessage("جاري تحميل معلومات جوازات السفر...");

      const passports = await getAllPassports(apiKey, token);
      // Update the state with the fetched data
      setTableData(customers);  // Updates tableData with customer data
      setPasswordTableData(passports.data);  // Updates passwordTableData with passport data
      console.log('tableData', tableData);
      console.log('tableData', passwordTableData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    finally {
      setLoading(false); // Stop loading
      setLoadingMessage(""); // Clear loader message
    }
  };

  // Trigger fetchData when the apiKey or token changes
  fetchData();
}, [apiKey, token]);  // Dependencies: This effect runs whenever apiKey or token changes



    const packageData = [
      {
        fullname: "بكج العطلات الصيفية",
        email: "",
        phone: "30 يوم",
        createdAt: "شركة السفر الدولية",
        company: "شركة السفر الدولية",
        availableBookings: "حجز الطيران والفنادق",
        availableDates: "15 يونيو 2024 - 30 أغسطس 2024",
      },
      {
        fullname: "بكج العطلات الشتوية",
        phone: "يوم 43",
        createdAt: "2024-12-01",
        company: "شركة الرحلات المميزة",
        availableBookings: "حجز المنتجعات والتزلج",
        availableDates: "1 ديسمبر 2024 - 15 فبراير 2025",
      },
      {
        fullname: "بكج الربيع العائلي",
        phone: " يوم 21",
        createdAt: "2024-03-10",
        company: "شركة الرحلات العائلية",
        availableBookings: "حجز الحدائق والمعالم السياحية",
        availableDates: "10 مارس 2024 - 10 مايو 2024",
      }
    ];
    

    
  const data = [
    {
      label: "سجل العملاء",
      value: "html",
      table: (
        /* i pass the data and setTable for delete*/
          <DataTable data={tableData} setData={setTableData} className='table-auto w-full border-collapse border border-gray-400'/>
      ),
    },
    {
      label: "سجل البكجات",
      value: "react",
      table: (
          <PackageTable data={packageData} />
      ),
    },
    {
      label: "سجل الرحل",
      value: "vue",
      table: (
        <table className="table-auto overflow-hidden border-collapse border border-gray-400">
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
      label: "سجل جوازات السفر",
      value: "angular",
      table: (
        <PassportTable data={passwordTableData} setData={setPasswordTableData} className='table-auto w-full border-collapse border border-gray-400'/>
      ),
    },
   
  ];



  return (
    <div>
    {/* Loader */}
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
            <div>
            {loading && <Loader> <div className="loader-message">{loadingMessage}</div></Loader>}

{table}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  );
}

// Styled Components for Loader
const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display:flex;
  flex-direction:column;
  gap:5px;

  &::after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

   .loader-message{
   font-size: 18px;
  font-weight: bold;
  color: #fff; /* White text color */
  text-align: center;
  padding: 10px;
  background-color: #3498db; /* Blue background color */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional: shadow around the message */
  animation: fadeIn 1s ease-in-out; /* Optional: fade-in animation */
  }
`;
