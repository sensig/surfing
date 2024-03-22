import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; // Import Image component from Next.js

const Dhill = () => {
  return (
    <>
      <header className="bg-gray-800 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
            <Link href="/" legacyBehavior>
              <a className="mr-5 hover:text-gray-900">Home</a>
            </Link>
            <Link href="/dhill" legacyBehavior>
              <a className="mr-5 hover:text-gray-900">Downhill Skate</a>
            </Link>
            <Link href="/bookingForm" legacyBehavior>
              <a className="hover:text-gray-900">Surf</a>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-lg">Downhill Skateboard Lessons</h1>
        <div className="flex justify-center">
          <Image
            src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/dhillLOGO.jpg"
            alt="Surf Logo"
            width={550} // Adjust these values to make the image smaller
            height={550} // Adjust these values to make the image smaller
            className="scale-75" // Makes the image 1/4 smaller
          />
        </div>
      </main>
    </>
  );
};

export default Dhill;
