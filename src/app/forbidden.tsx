import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <p className="text-2xl font-light text-gray-600 mt-4">Access Denied</p>
        <div className="mt-6">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
