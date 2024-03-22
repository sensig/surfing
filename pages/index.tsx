import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <header className="bg-gray-800 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
            <Link href="/" legacyBehavior>
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>
            <Link href="/dhill" legacyBehavior>
              <a className="mr-5 hover:text-gray-900">Downhill Skate </a>
            </Link>
            <Link href="/bookingForm" legacyBehavior>
              <a className="hover:text-gray-900">Surf</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <div className="w-full flex flex-col items-center space-y-10 mt-10">
          <div className="text-center border border-white p-4">
             <div className="flex justify-center">
              <Image
                src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/logo.gif"
                alt="Surf Logo"
                width={550} // Adjust these values to make the image smaller
                height={550} // Adjust these values to make the image smaller
                className="scale-75" // Makes the image 1/4 smaller
              />
              
            </div>
            <div className="text-center border border-white p-4">
            <h2 className="text-xl font-semibold">Surf Lessons</h2>
            <Link href="/bookingForm" passHref>
              <button className="button">Book Now</button>
            </Link>
          </div>
          <div className="text-center border border-white mt-4 p-4">
            <h2 className="text-xl font-semibold">Downhill Skateboarding</h2>
          </div>
          </div>
        
        </div>
      </main>
    </>
  );
}
