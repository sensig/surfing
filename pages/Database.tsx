import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../components/supabaseClient'; // Adjust the import path as necessary

interface BookingEntry {
  id: number;
  name: string;
}

const Database = () => {
  const [bookings, setBookings] = useState<BookingEntry[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, name');

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <>
      {/* Navigation Tabs */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
        <div className="container mx-auto flex justify-center space-x-4 p-4">
          <Link href="/"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">New Surf Lessons</a>
          </Link>
          <Link href="/dhill-lessons"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">DHill Lessons</a>
          </Link>
          <Link href="/database"legacyBehavior>
            <a className="px-4 py-2 text-blue-600 hover:text-blue-800">Database</a>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20 container mx-auto">
        <h2>Booking Entries</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>
                  <Link href={`/surfdetails?id=${booking.id}`}legacyBehavior>
                    <a>{booking.name}</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Database;
