import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface DateClickArg {
  dateStr: string;
  // Add any other properties from the event object you might use
}

const Schedule = () => {
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const router = useRouter();

  // Sample time options
  const timeOptions = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM',
  ];

  const handleDateClick = ({ dateStr }: DateClickArg) => {
    setSelectedDateTime(dateStr);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const navigateToDatabase = () => {
    if (!selectedDateTime || !selectedTime) {
      alert("Please select a date and time before proceeding.");
      return;
    }
    router.push({
        pathname: '/form',
        query: { selectedDateTime: selectedDateTime, selectedTime: selectedTime },
    });
  };

  const navigateToBookingForm = () => {
    router.push('/');
  };

  return (
    <>
       
      <div className="container mx-auto border border-white p-4 mt-8 mb-8">
        <div style={{ width: '50%', margin: '0 auto' }}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={(info) => handleDateClick(info)}
          />
        </div>
        {selectedDateTime && (
          <>
            <p className="text-center mt-4">Selected Date: {selectedDateTime}</p>
            <div className="flex justify-center mt-4">
              <label htmlFor="timeSelect" className="mr-2">Select Time:</label>
              <select
                id="timeSelect"
                value={selectedTime}
                onChange={handleTimeChange}
                className="text-black"
              >
                <option value="">Select</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
            {selectedTime && (
              <p className="text-center mt-2">Selected Time: {selectedTime}</p>
            )}
          </>
        )}
        <div className="flex justify-center mt-4">
          <button className="mr-2" onClick={navigateToBookingForm}>Back</button>
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateToDatabase}>Next</button>
        </div>
        
      </div>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', padding: '0 20px 20px' }}>
  <Image 
    src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/surflesson.png" 
    alt="Surf Background" 
    layout="fill"
    objectFit="cover" 
  />
</div>


    </>
  );
};

export default Schedule;
