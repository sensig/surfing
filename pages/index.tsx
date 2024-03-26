import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { supabase } from '../components/supabaseClient'; // Make sure the path matches your project structure

interface Booking {
  id: number; // Adjust the type if your IDs are string
  name: string;
  date: string; // Adjust based on your actual data structure
}

export default function Home() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, name, date');

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Fixed navigation bar at the top */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
        <div className="container mx-auto flex justify-center space-x-4 p-4">
          <Link href="/"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">New Surf Lessons</a>
          </Link>
          <Link href="/Dhill_Lessons"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">DHill Lessons</a>
          </Link>
          <Link href="/Database"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">Database</a>
          </Link>
        </div>
      </nav>

      {/* Main content with top padding to ensure it does not overlap the fixed navbar */}
      <div className="pt-20 w-full">
        <table className="mx-auto w-1/2 text-left">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  <Link href={`/surfdetails?name=${encodeURIComponent(booking.name)}`}legacyBehavior>
                    <a className="text-blue-500 hover:underline">{booking.name}</a>
                  </Link>
                </td>
                <td>{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
