import { Eye, ReceiptIndianRupee, ShoppingCart, Users } from "lucide-react";

const Statsdata=[
  {
    title:"Total Revenue",
    value:"Rs 124,563",
    change:"+12.5%",
    trend:"up",
    icon:ReceiptIndianRupee,
    color:"from-emerald-500 to-teal-600",
    bgColor:"bg-emerald-50 dark:bg-emerald-900/20",
    textColor:"text-emerald-600 dark:text-emarald-400",
  },
  {
    title:"Active Users",
    value:"8,549",
    change:"+8.2%",
    trend:"up",
    icon:Users,
    color:"from blue-500 to-indigo-600",
    bgColor:"bg-blue-50 dark:bg-blue-900/20",
    textColor:"text-blue-600 dark:text-blue-400",
  },
  {
    title:"Total Orders",
    value:"2,847",
    change:"+15.3%",
    trend:"up",
    icon: ShoppingCart,
    color:"from-purple-500 to-pink-600",
    bgColor:"bg-purple-50 dark:bg-purple-900/2",
    textColor:"text-purple-600 dark:text-purple-400",
  },
  {
    title:"Page Views",
    value:"45,892",
    change:"-2.1%",
    trend:"down",
    icon:Eye,
    color:"from-orange-500 to-red-600",
    bgColor:"bg-orange-50 dark:bg-orange-900/2",
    textColor:"text-orange-600 dark:text-orange-400"
  },
];

export default Statsdata