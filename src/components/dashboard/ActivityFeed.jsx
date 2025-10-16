import { User, ShoppingCart, Bell, Settings } from 'lucide-react';
import React from 'react';

const activities = [
  {
    id: 1,
    type: "users",
    icon: User,
    title: "New User Registered",
    description: "John Smith created an account",
    time: "2 minutes ago",
    color: "text-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 2,
    type: "orders",
    icon: ShoppingCart,
    title: "New Order Placed",
    description: "Order #3847 has been placed",
    time: "10 minutes ago",
    color: "text-green-100 dark:bg-green-900/30",
  },
  {
    id: 3,
    type: "payment",
    icon: ShoppingCart,
    title: "Payment Received",
    description: "Payment of Rs. 124.50 received for Order #3847",
    time: "30 minutes ago",
    color: "text-purple-100 dark:bg-purple-900/30",
  },
  {
    id: 4,
    type: "notification",
    icon: Bell,
    title: "New Notification",
    description: "You have 3 unread messages",
    time: "1 hour ago",
    color: "text-yellow-100 dark:bg-yellow-900/30",
  },
  {
    id: 5,
    type: "system updates",
    icon: Settings,
    title: "System Update Available",
    description: "Version 2.1.0 is ready to install",
    time: "2 hours ago",
    color: "text-red-100 dark:bg-red-900/30",
  }
];

const ActivityFeed = () => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Activity Feed
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent System Activities
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="p-6 space-y-4">
        {activities.map(({ id, icon: Icon, title, description, time, color }) => (
          <div
            key={id}
            className="flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className={`p-2 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                {title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {description}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
