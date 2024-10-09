import React from "react";
import { groupOrdersByDate } from "@/app/admin/(tabs)/analytics/_components/group-orders";
import AnalyticsChart from "@/app/admin/(tabs)/analytics/_components/orders-chart";
import { OrdersChartData } from "@/app/admin/(tabs)/analytics/_components/orders-chart";
import { generateOrdersData } from "@/app/admin/_components/fake-data";

const AnalyticsPage = () => {
  const orders = generateOrdersData(2000)
  const paidOrders = orders.filter(order=>order.isPaid===true)
  const chartData: OrdersChartData[] = groupOrdersByDate(paidOrders);
  
  return (
    <main className="flex overflow-x-auto max-w-[100vw] p-4">
        <div className="min-w-full">
            <AnalyticsChart chartData={chartData} />
        </div>
    </main>
  );
};

export default AnalyticsPage;
