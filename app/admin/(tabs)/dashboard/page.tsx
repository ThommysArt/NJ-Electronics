import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import OrdersCard from "@/app/admin/_components/orders-card";
import Link from "next/link";
import { getAllOrders } from "@/utils/data/orders";

const page = async () => {
  // Get orders from the API
  const orders = await getAllOrders()

  //Function to get the fisrt and last days of the year
  const getYearRange = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), 1, 1);
    const lastDay = new Date(date.getFullYear() + 1, 1, 1);
    return { firstDay, lastDay };
  }
  // Function to get the first and last day of the month
  const getMonthRange = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { firstDay, lastDay };
  };

  // Function to get the first and last day of the week (starting on Monday)
  const getWeekRange = (date: Date) => {
    const firstDay = new Date(date);
    firstDay.setDate(date.getDate() - date.getDay() + 1);
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    return { firstDay, lastDay };
  };

  const getRevenueInRange = (startDate: Date, endDate: Date) => {
    return orders
      .filter(
        (order) =>
          order.isPaid &&
          new Date(order.createdAt) >= startDate &&
          new Date(order.createdAt) <= endDate
      )
      .reduce((revenue, order) => revenue + order.amount, 0);
  };

  // Get this year and last years revenue
  const GetThisYearRevenue = () => {
    const { firstDay, lastDay } = getYearRange(new Date());
    return getRevenueInRange(firstDay, lastDay);
  }

  const GetLastYearRevenue = () => {
    const { firstDay, lastDay } = getYearRange(new Date());
    firstDay.setDate(firstDay.getFullYear() - 1)
    lastDay.setDate(lastDay.getFullYear() - 1)
    return getRevenueInRange(firstDay, lastDay)
  }

  // Get this months and last months revenue
  const GetThisMonthRevenue = () => {
    const { firstDay, lastDay } = getMonthRange(new Date());
    return getRevenueInRange(firstDay, lastDay);
  };

  const GetLastMonthRevenue = () => {
    const { firstDay, lastDay } = getMonthRange(new Date());
    firstDay.setMonth(firstDay.getMonth() - 1);
    lastDay.setMonth(lastDay.getMonth() - 1);
    return getRevenueInRange(firstDay, lastDay);
  };

  // Get this week and alst weeks revenue
  const GetThisWeekRevenue = () => {
    const { firstDay, lastDay } = getWeekRange(new Date());
    return getRevenueInRange(firstDay, lastDay);
  };

  const GetLastWeekRevenue = () => {
    const { firstDay, lastDay } = getWeekRange(new Date());
    firstDay.setDate(firstDay.getDate() - 7);
    lastDay.setDate(lastDay.getDate() - 7);
    return getRevenueInRange(firstDay, lastDay);
  };

  // Compare the revenue for passed 2 years, months and weeks
  const GetYearlyComparison = () => { 
    const thisYearRevenue = GetThisYearRevenue()
    const lastYearRevenue = GetLastYearRevenue()
    const difference = thisYearRevenue - lastYearRevenue
    let percentageChange = ((difference / lastYearRevenue) * 100).toFixed(2)
    if (lastYearRevenue === 0) {percentageChange=(1*100).toFixed(2)}
    return { thisYearRevenue, lastYearRevenue, percentageChange }
  }

  const GetMonthlyComparison = () => {
    const thisMonthRevenue = GetThisMonthRevenue();
    const lastMonthRevenue = GetLastMonthRevenue();
    const difference = thisMonthRevenue - lastMonthRevenue;
    const percentageChange = ((difference / lastMonthRevenue) * 100).toFixed(2);
    return { thisMonthRevenue, lastMonthRevenue, percentageChange };
  };

  const GetWeeklyComparison = () => {
    const thisWeekRevenue = GetThisWeekRevenue();
    const lastWeekRevenue = GetLastWeekRevenue();
    const difference = thisWeekRevenue - lastWeekRevenue;
    const percentageChange = ((difference / lastWeekRevenue) * 100).toFixed(2);
    return { thisWeekRevenue, lastWeekRevenue, percentageChange };
  };

  const { thisYearRevenue, percentageChange: yearlyPercentageChange } = 
    GetYearlyComparison()
  const { thisMonthRevenue, percentageChange: monthlyPercentageChange } =
    GetMonthlyComparison();
  const { thisWeekRevenue, percentageChange: weeklyPercentageChange } =
    GetWeeklyComparison();

  // Convert percentage change to float
  const yearlyPercentage = parseFloat(yearlyPercentageChange)
  const monthlyPercentage = parseFloat(monthlyPercentageChange);
  const weeklyPercentage = parseFloat(weeklyPercentageChange);

  return (
    <main className="flex flex-col sm:flex-row gap-4 justify-center w-full h-fit py-20 sm:py-12 px-4">
      <div className="flex flex-col gap-4 justify-stretch">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Products</CardTitle>
            <CardDescription className="text-balance max-w-lg leading-relaxed">
              Add New smartphones, headphones, watches, and more to the shop
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button><Link href="/admin/products/new">Add Product</Link></Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl">
              XAF {thisWeekRevenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {weeklyPercentageChange}% from last week
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              value={weeklyPercentage}
              aria-label={`${weeklyPercentage}% ${
                weeklyPercentage > 0 ? "increase" : "decrease"
              }`}
            />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">
              XAF {thisMonthRevenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {monthlyPercentageChange}% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              value={monthlyPercentage}
              aria-label={`${monthlyPercentage}% ${
                monthlyPercentage > 0 ? "increase" : "decrease"
              }`}
            />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Year</CardDescription>
            <CardTitle className="text-4xl">
              XAF {thisYearRevenue.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {yearlyPercentageChange}% from last year
            </div>
          </CardContent>
          <CardFooter>
            <Progress
              value={yearlyPercentage}
              aria-label={`${yearlyPercentage}% ${
                yearlyPercentage > 0 ? "increase" : "decrease"
              }`}
            />
          </CardFooter>
        </Card>
      </div>
      <OrdersCard orders={orders} />
    </main>
  );
};

export default page;
