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


// Now you can use these variables (name, date, and time) in your component


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
      const { error } = await supabase.from('bookings').insert([{ ...formData, age }]);
      if (error) throw error;
  
      // Determine the next page based on age
      const pathname = age >= 18 ? '/waiver' : '/waiverminor';
  
      // Pass email, name, date, and time as query parameters
      router.push({
        pathname: pathname,
        query: {
          email: formData.email,
          name: formData.name,
          date: formData.date,
          time: formData.time,
        },
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div>
    
    
    <div className="container mx-auto p-4">
    <h2 className="text-lg font-semibold mb-4 text-center">Booking Form</h2>

      
      <div className="container mx-auto p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100vh' }}>

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">Attendee Name</label>
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

    </div>
    </div>
  );
};

export default Database;
