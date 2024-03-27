import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BookingForm.module.css';


// Importing the CSS module



const BookingForm = () => {
  return (
    <>
    

      <div className="container mx-auto mt-8 mb-8 relative" style={{ height: '500px' }}>
    <Image
        src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/surfREAL.jpg"
        alt="Surf Background"
        layout="fill"
        objectFit="cover"
    />

    {/* Text and "BOOK NOW" button at the top center */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full text-center text-white">
        <div className="flex justify-center">
            <div className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <h1 style={{ textDecoration: 'underline', marginBottom: '10px' }}>Private Surf Lessons</h1>
                <h1>$60.00</h1>
                <p>90 minutes</p>
            </div>
        </div>
        <Link href="/schedule" passHref>
            <button className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded">
                BOOK NOW
            </button>
        </Link>
    </div>

    {/* Logo image at the bottom right corner */}
    <div className="absolute bottom-0 right-0 mb-0 mr-0">
        <Image
            src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/weblogo.png"
            alt="Surf Logo"
            width={200} // Adjust these values to fit your design
            height={260}
            objectFit="cover"
        />
    </div>
</div>



<h1 className= "text-lg " style={{ textAlign: 'center' }}>
  Ocean Beach Surf Experience</h1>
<div>
  <p className="text-lg mt-10" style={{ textAlign: 'center' }}>
  Ocean Beach Surf Experience offers private one on one surf lessons. The 90-minute session is structured to instill the foundational 
  skills of surfing, including the pop-up technique, wave timing, effective paddling strategies, and familiarizing yourself with surf etiquette and safety measures.</p> 
</div>

<div>
<p className="text-lg mt-10" style={{ textAlign: 'center' }}>
The initial 15 minutes of your surf lesson are dedicated to:

getting you the proper gear including board and wetsuit. Then we will start
Conducting our on-land tutorial, emphasizing on ocean safety, and then to master the pop-up technique and correct stance before making your way into the surf.
</p>
</div>
<p className="text-lg mt-10" style={{ textAlign: 'center' }}>
The rest of our time will be dedicated to surfing! 
How to stand up on your board,
The art of paddling,
Timing your interaction with waves,
Selecting the right waves,
Familiarizing yourself with surf etiquette and safety measures.
</p>





<div style={{ textAlign: 'center' }}>
  
  <h1 style={{ textDecoration: 'underline',marginTop: '30px',textAlign: 'center' }}>Location</h1>
  <p>Ocean Beach tower 5</p>
  <p>Dog Beach, San Diego, CA 92107</p>
  <h1 style={{ textDecoration: 'underline',marginTop: '30px',textAlign: 'center' }}>Whats included</h1>
  <p>Surfboard & Wetsuit/Rashguard</p>
  <h1 style={{ textDecoration: 'underline', marginTop: '30px',textAlign: 'center' }}>What to bring</h1>
  <p>water, sunscreen, towel</p>
  <h1 style={{ textDecoration: 'underline', marginTop: '30px', textAlign: 'center' }}>Our Instructors</h1>

  <p>Our team of professional instructors, all of whom are certified in first aid and CPR, are dedicated to teaching you the correct surfing techniques, ensuring a safe and exhilarating learning experience. These instructors are also certified water safety specialists.</p>
</div>



<div className="flex justify-center mt-10 mb-5">
  <Link href="/schedule" passHref>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      BOOK NOW
    </button>
  </Link>
</div>




      <div className="flex justify-center items-center mb-4">
      <Image
  src="https://iowivkgrejrwddohzemm.supabase.co/storage/v1/object/public/photos/surflesson2.jpg"
  alt="Surf Logo"
  width={550} // Specified width
  height={550} // Specified height
/>

          
        </div>
      
    </>
  );
};

export default BookingForm;
