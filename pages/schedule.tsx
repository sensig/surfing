import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Improved: Added interface for DateClickArg to provide a type for the dateClick event argument.
interface DateClickArg {
  dateStr: string;
}

const Schedule: React.FC = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const router = useRouter();

  // Improved: Defined the structure of timeOptions explicitly.
  const timeOptions: string[] = generateTimeSlots();

  function generateTimeSlots(): string[] {
    const slots: string[] = [];
    const openingTime = 7; // 7 AM
    const closingTime = 18; // 6 PM, represented as 18 in 24-hour format
    let currentTime = openingTime;

    while (currentTime + 1.5 <= closingTime) {
      let startHour = Math.floor(currentTime);
      let startMinute = currentTime % 1 === 0 ? '00' : '30';
      let endHour = Math.floor(currentTime + 1.5);
      let endMinute = (currentTime + 1.5) % 1 === 0 ? '00' : '30';
      
      // AM/PM format adjustment
      const startMeridiem = startHour < 12 ? 'AM' : 'PM';
      const endMeridiem = endHour < 12 ? 'AM' : 'PM';
      
      // Convert 24-hour time to 12-hour format
      startHour = startHour > 12 ? startHour - 12 : startHour;
      endHour = endHour > 12 ? endHour - 12 : endHour;

      slots.push(`${startHour}:${startMinute} ${startMeridiem} - ${endHour}:${endMinute} ${endMeridiem}`);
      currentTime += 1.75; // Considering 1.5 hours for a slot and 15 minutes as buffer
    }
    return slots;
  }

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDateTime(arg.dateStr);
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
        query: { selectedDateTime, selectedTime },
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
            dateClick={({ dateStr }) => handleDateClick({ dateStr })}
          />
        </div>
        {selectedDateTime && (
          <>
            <p className="text-center mt-4">Selected Date: {selectedDateTime}</p>
            <div className="flex justify-center mt-4">
              <label htmlFor="timeSelect" className="mr-2">Select Time Slot:</label>
              <select
                id="timeSelect"
                value={selectedTime}
                onChange={handleTimeChange}
                className="text-black"
              >
                <option value="">Select a Time Slot</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
            {selectedTime && (
              <p className="text-center mt-2">Selected Time Slot: {selectedTime}</p>
            )}
          </>
        )}
        <div className="flex justify-center mt-4">
          <button className="mr-2" onClick={navigateToBookingForm}>Back</button>
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={navigateToDatabase}>Next</button>
        </div>
      </div>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', padding: '0 20px 20px' }}>
        <Image           src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/surflesson.png"
          alt="Surf Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
};

export default Schedule;

