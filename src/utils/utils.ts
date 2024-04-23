import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToCSV(data: any[]) {
  const headers = Object.keys(data[0]);
  const csvContent =
    headers.join(",") +
    "\n" +
    data
      .map((row) =>
        headers.map((fieldName) => JSON.stringify(row[fieldName])).join(",")
      )
      .join("\n");
  return csvContent;
}

export function downloadCSV(name: string, data: any[]) {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
