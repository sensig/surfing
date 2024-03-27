import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="bg-gray-800 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            {/* Updated Link usage for Next.js 13 */}
            <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
            <Link href="/schedule" className="hover:text-gray-900">Book Now</Link>
          </nav>
          <div className="text-base mr-4">
            <p className="text-gray-300">619 552 3043</p>
            <p className="text-gray-300">obsurfexperience@gmail.com</p>
          </div>
        </div>
      </header>

      <Component {...pageProps} />

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} SDRI</p>
        <p>
          {/* Keep the passHref if the child is a custom component needing href */}
          <Link href="/privacypolicy" className="hover:text-gray-300">Privacy Policy</Link>
        </p>
      </footer>
    </>
  );
}

export default MyApp;
