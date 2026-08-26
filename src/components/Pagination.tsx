import React from "react";

interface Props {
  page: number;
  pageSize: number;
  totalItems: number;
  pageSizes?: number[];
  totalPages: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  totalItems,
  pageSizes = [5, 10, 20],
  totalPages,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <div className="mt-4 flex items-center justify-between space-x-4">
      <div className="text-sm text-gray-600">
        Showing {totalItems === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} of {totalItems}
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600">Page size:</label>
        <select
          className="border rounded px-2 py-1 text-sm text-black"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizes.map((ps) => (
            <option key={ps} value={ps}>{ps}</option>
          ))}
        </select>

        <div className="flex items-center space-x-1">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-sm text-black disabled:opacity-50 hover:bg-gray-300 hover:cursor-pointer"
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          >
            ←
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`px-2 py-1 rounded text-sm hover:cursor-pointer ${p === page ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            className="px-3 py-1 rounded bg-gray-200 text-sm text-black disabled:opacity-50 hover:bg-gray-300 hover:cursor-pointer"
            disabled={page >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
