import { OrdersChartData } from "@/app/admin/(tabs)/analytics/_components/orders-chart";
import { Order } from "@prisma/client";

export function groupOrdersByDate(orders: Order[]): OrdersChartData[] {
    const ordersByDate: { [key: string]: { orders: number; revenue: number } } = {};
  
    orders.forEach(order => {
      const dateStr = order.createdAt.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD' for grouping
    
      if (ordersByDate[dateStr]) {
        ordersByDate[dateStr].orders++;
        ordersByDate[dateStr].revenue += order.amount;
      } else {
        ordersByDate[dateStr] = { orders: 1, revenue: order.amount };
      }
    });

    return Object.keys(ordersByDate).map(dateStr => {
      const date = new Date(dateStr); // Convert the date string back to a Date object
      return {
        date,
        orders: ordersByDate[dateStr].orders,
        revenue: ordersByDate[dateStr].revenue,
      };
    });
}

