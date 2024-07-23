"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const CalenderComponent = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-100"
        />
    );
};

export default CalenderComponent;
