"use client";

import { SearchIcon } from "@/icons/icons";
import { useState, useMemo, ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: unknown, row: T) => ReactNode;
  searchable?: boolean;
  className?: string;
}

interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onSearch?: (searchTerm: string) => void;
}

export default function Table<T extends { id: string | number }>({
  data,
  columns,
  title,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found",
  onSearch,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch?.(term);
  };

  const searchableColumns = useMemo(
    () => columns.filter((col) => col.searchable !== false),
    [columns],
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      searchableColumns.some((col) => {
        const value = row[col.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      }),
    );
  }, [data, searchTerm, searchableColumns]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        {title && (
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        )}
        <div className={`${title ? "w-1/3" : "w-full"} relative`}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 pl-10 block w-full rounded-md border-black shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${col.className || ""}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${col.className || ""}`}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
