import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../components/supabaseClient'; // Make sure the path matches your project structure

interface BookingDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  time: string;
  age: number;
  waiver: string;
  waiverAgreed: boolean;
  pname: string; // Parent name for minors, if applicable
  pemail: string; // Parent email for minors, if applicable
  minorAgree: boolean;
}

const SurfDetails = () => {
  const router = useRouter();
  const { name } = router.query;

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (typeof name === 'string') {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('name', name)
          .single();

        if (error) {
          console.error("Error fetching booking details:", error);
          return;
        }

        setBookingDetails(data);
      }
    };

    fetchBookingDetails();
  }, [name]);

  // Navigation tabs
  const navTabs = (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
      <div className="container mx-auto flex justify-center space-x-4 p-4">
        <Link href="/" legacyBehavior>
          <a className="px-4 py-2 text-blue-600 hover:text-blue-800">New Surf Lessons</a>
        </Link>
        <Link href="/DHill_Lessons" legacyBehavior>
          <a className="px-4 py-2 text-blue-600 hover:text-blue-800">DHill Lessons</a>
        </Link>
        <Link href="/Database" legacyBehavior>
          <a className="px-4 py-2 text-blue-600 hover:text-blue-800">Database</a>
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      {navTabs}
      <div className="pt-20 container mx-auto">
        <h2 className="text-xl font-semibold my-4">Booking Details</h2>
        {!bookingDetails ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>ID: {bookingDetails.id}</p>
            <p>Name: {bookingDetails.name}</p>
            <p>Email: {bookingDetails.email}</p>
            <p>Phone Number: {bookingDetails.phoneNumber}</p>
            <p>Date: {bookingDetails.date}</p>
            <p>Time: {bookingDetails.time}</p>
            <p>Age: {bookingDetails.age}</p>
            <p>Waiver Document: {bookingDetails.waiver}</p>
            <p>Waiver Agreed: {bookingDetails.waiverAgreed ? 'Yes' : 'No'}</p>
            <p>Parent Name: {bookingDetails.pname}</p>
            <p>Parent Email: {bookingDetails.pemail}</p>
            <p>Minor Agreement: {bookingDetails.minorAgree ? 'Agreed' : 'Not Agreed'}</p>
          </>
        )}
      </div>
    </>
  );
};

export default SurfDetails;
