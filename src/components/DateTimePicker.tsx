"use client";

import { useEffect, useState } from "react";

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({
  value,
  onChange,
}: DateTimePickerProps) {
  const validDate = value instanceof Date && !isNaN(value.getTime()) ? value : new Date();
  
  const [date, setDate] = useState(validDate.toISOString().split("T")[0]);
  const [time, setTime] = useState(validDate.toTimeString().slice(0, 5));

  useEffect(() => {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(year, month - 1, day, hours, minutes);
    onChange(newDate);
  }, [date, time, onChange]);

  return (
    <div className="flex gap-2">
      <input
        type="date"
        name="startDate"
        id="startDate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
      <input
        type="time"
        name="startTime"
        id="startTime"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="p-2 mt-1 block w-full rounded-md border-1 border-black focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
        required
      />
    </div>
  );
}
