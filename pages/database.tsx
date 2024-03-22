import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';


const Database = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    age: '',
  });

  const router = useRouter();

  useEffect(() => {
    // Extracting query parameters and setting form data accordingly
    const query = router.query;
    if (typeof query.selectedDateTime === 'string' && typeof query.selectedTime === 'string') {
      const [date] = query.selectedDateTime.split(', ');
      const time = query.selectedTime;
      setFormData(prev => ({
        ...prev,
        date,
        time,
      }));
    }
  }, [router.query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const age = parseInt(formData.age, 10);
    if (isNaN(age)) {
      alert('Please enter a valid age.');
      return;
    }
  
    try {
      await supabase.from('bookings').insert([{ ...formData, age }]);
  
      // Navigate to the appropriate waiver page based on age and pass the email
      const pathname = age >= 18 ? '/waiver' : '/waiverminor';
      router.push({
        pathname: pathname,
        query: { email: formData.email }, // Passing email as a query parameter
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      {/* Header with Navigation */}
      <header className="bg-gray-800 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
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
    
    <div className="container mx-auto p-4">
    <h2 className="text-lg font-semibold mb-4 text-center">Booking Form</h2>

      
      <div className="container mx-auto p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
            style={{ color: 'black' }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
            style={{ color: 'black' }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-bold text-gray-700">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            readOnly
            className="input"
            style={{ color: 'black' }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-bold text-gray-700">Time</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            readOnly
            className="input"
            style={{ color: 'black' }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-bold text-gray-700">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="input"
            style={{ color: 'black' }}
          />
        </div>

        <div className="flex justify-between mb-5">
          <button type="button" onClick={() => router.push('/schedule')} className="btn-back">
            Back
          </button>
          <button type="submit" className="btn-submit">
           Next
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
  <p>After agreeing to the waiver on the next page, you will be sent a confirmation email with your lesson details.</p>
</div>

 </div>

       <footer className="bg-gray-800 text-white mt-4 text-center py-4">
      <p>&copy; {new Date().getFullYear()} SDRI</p>
      <p>
      <Link href="/privacypolicy/">Privacy Policy</Link>  </p>
    </footer>
    </div>
    </div>
  );
};

export default Database;