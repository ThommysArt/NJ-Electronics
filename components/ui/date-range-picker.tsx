"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useMediaQuery } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
    className?: React.HTMLAttributes<HTMLDivElement>,
    dateRange: DateRange | undefined,
    onDateChange: (e: DateRange | undefined) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({className, dateRange, onDateChange}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal bg-transparent",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {isDesktop ? (
            <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(e)=>{
                onDateChange(e)
                }
            }
            numberOfMonths={2}
          />
          ):(
            <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={(e)=>{
                onDateChange(e)
                }
            }
            numberOfMonths={1}
          />
          )}
          
        </PopoverContent>
      </Popover>
    </div>
  )
}


export {DateRangePicker};