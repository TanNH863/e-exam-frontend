import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-light text-gray-600 mt-4">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500">We can't seem to find the page you're looking for.</p>
        <div className="mt-6">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
