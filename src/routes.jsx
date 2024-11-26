import { Home, Profile, SignIn, SignUp,Clients ,Reverssation,PackagesList} from "@/pages";

export const routes = [
  {
    name: "الرئيسية",
    path: "/home",
    element: <Home />,
  },
  {
    name: "الحجز",
    path: "/Reverssation",
    element: <Reverssation />,
  },
  {
    name: "عميل جديد",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "البكجات",
    path: "/Packages",
    element: <PackagesList />,
  },
  {
    name: "تقارير الرحل",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "قائمه العملاء",
    path: "/Clients",
    element: <Clients />,
  },

{
  name:'',
  path: "/sign-in",
  element: <SignIn />,
}
];

export default routes;
