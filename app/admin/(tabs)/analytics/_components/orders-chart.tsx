"use client"

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker"; // Update the path if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui/separator";

export type OrdersChartData = {
    date: Date;
    orders: number;
    revenue: number;
};
  
interface AnalyticsChartProps {
    chartData: OrdersChartData[];
} 

const chartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--primary))",
    },
    revenue: {
      label: "Revenue",
      color: "hsl(var(--accent-foreground))",
    },
} satisfies ChartConfig;

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ chartData }) => {
    const today = new Date()
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("orders");
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(today.getFullYear(), today.getMonth()-1, today.getDate()),
        to: today,
    });

    // Sort data by date
    const sortedData = React.useMemo(() => {
        return chartData.slice().sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [chartData]);

    const filteredData = React.useMemo(() => {
        if (!dateRange || !dateRange.from || !dateRange.to) return sortedData;

        const from = dateRange.from.getTime();
        const to = dateRange.to.getTime();

        return sortedData.filter((data) => {
            const date = new Date(data.date).getTime();
            return date >= from && date <= to && data;
        });
    }, [dateRange, sortedData]);

    const total = React.useMemo(
        () => ({
            orders: filteredData.reduce((acc, curr) => acc + curr.orders, 0),
            revenue: filteredData.reduce((acc, curr) => acc + curr.revenue, 0),
        }),
        [filteredData]
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Get some insight on the orders and revenue within the time frame you want. </CardDescription>
                </div>
                <div className="flex">
                    {["orders", "revenue"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <div className="flex flex-row space-x-2 text-lg font-bold leading-none sm:text-xl">
                                    {key==="revenue"&& (<span>XAF</span>)}
                                    <span>{total[chart as keyof typeof total].toLocaleString()}</span>
                                    {key==="orders"&& (<span>Orders</span>)}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="p-0 pb-8 m-0">
                <div className="flex items-center space-x-4 p-4">
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-muted-foreground">Select Date Range:</p>
                        <DateRangePicker dateRange={dateRange} onDateChange={setDateRange} />
                    </div>
                </div>
                <Separator className="mb-10"/>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full px-4 sm:px-6"
                >
                    <BarChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[170px]"
                                    nameKey={activeChart}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0) {
                                            const date = payload[0].payload.date;
                                            return new Date(date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            });
                                        }
                                        return "";
                                    }}
                                    formatter={(value, name) => {
                                        return (
                                            <div className="flex flex-row justify-between items-center w-full gap-2 text-xs">
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className={`w-3 h-3 rounded`} style={{backgroundColor: `${chartConfig[name as keyof typeof chartConfig].color}`}}></div>
                                                    <p className=" text-muted-foreground">{chartConfig[name as keyof typeof chartConfig].label}</p>
                                                </div>
                                                {chartConfig[name as keyof typeof chartConfig].label==="Orders" ? (
                                                    <p className="flex font-semibold">{value} Orders</p>
                                                ):(
                                                    <p className="flex font-semibold">XAF {value}</p>
                                                )}
                                            </div>
                                        )
                                    }}
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={4}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default AnalyticsChart;
