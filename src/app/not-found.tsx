import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-orange-500">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <Link
            href="/en/home"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
