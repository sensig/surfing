import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // Ensure this path is correct
import emailjs from 'emailjs-com';
import Link from 'next/link';


const Waiver = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  // Extract the email directly from the router query
  const email = router.query.email as string;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!isChecked) {
      alert("Please agree to the waiver terms before proceeding.");
      return;
    }
  
    if (!email) {
      alert("Email not found. Please try again or contact support.");
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ waiverAgreed: true })
        .match({ email: email }); // Use the email to match the booking record
  
      if (error) {
        console.error('Supabase error:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }
  
      console.log('Agreement recorded.');

      const templateParams = {
        to_name: 'User', // Ideally, you would use the user's actual name here
        to_email: email, // Use the email from the query
        subject: 'Waiver Agreement Confirmation',
        message: 'Thank you for agreeing to the waiver terms. Your booking is confirmed.',
      };
  
      emailjs.send('service_arlnk8o', 'template_9lbxd5i', templateParams, 'tnYjhNlQa8ObtYMid')
        .then((emailResponse) => {
          console.log('Email sent:', emailResponse.text);
          window.location.href = 'https://buy.stripe.com/test_6oEbKvcZs8tn4Jq000'; // Ensure this URL is correct for your use case
        })
        .catch((emailError) => {
          console.error('Email sending error:', emailError.text);
          alert('An error occurred while sending the confirmation email.');
        });
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/database');
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">Surfing Lesson Liability Waiver</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 overflow-auto" style={{ maxHeight: "300px", border: "1px solid #ccc" }}>
          {/* Waiver text goes here */}
          <p>In consideration of being allowed to participate in any way in the surfing lessons, activities, and programs of <span className="bold">Kludyville Surf School</span> (&quot;Surf School&quot;) and to use its equipment and facilities, I acknowledge, appreciate, and agree to the following conditions:</p>

<p><span className="bold">1. Acknowledgment of Risks:</span> I understand and acknowledge that surfing involves risks that may lead to bodily injury, illness, death, or property damage. These risks include, but are not limited to, ocean conditions, marine life interactions, contact with other participants, equipment failure, and weather conditions. I understand that these risks may be present before, during, and after participation in surfing lessons.</p>

<p><span className="bold">2. Assumption of Risk:</span> I willingly agree to assume all risks associated with participation in surfing lessons, including those risks that may result from the negligence of the Surf School, its instructors, employees, or agents.</p>

<p><span className="bold">3. Waiver of Liability:</span> I, for myself and on behalf of my heirs, assigns, personal representatives, and next of kin, hereby release, indemnify, and hold harmless the Surf School, its officers, officials, agents, and/or employees, other participants, sponsoring agencies, sponsors, advertisers, and if applicable, owners and lessors of premises used to conduct the event (&quot;Releasees&quot;), from any and all liability for injury, disability, death, or loss or damage to person or property, whether caused by the negligence of the releasees or otherwise, to the fullest extent permitted by law.</p>

<p><span className="bold">4. Indemnification:</span> I agree to indemnify and defend the Surf School against all claims, causes of action, damages, judgments, costs, or expenses, including attorney fees and other litigation costs, which may in any way arise from my or my family&apos;s use of or presence upon the facilities of the Surf School.</p>

<p><span className="bold">5. Acknowledgment of Policies and Procedures:</span> I agree to abide by the rules and policies established by the Surf School, including all instructions and safety procedures communicated by the instructors. I understand that my failure to adhere to these rules may result in my expulsion from participation, without a refund.</p>

<p><span className="bold">6. Medical Release:</span> I certify that I am physically fit and have not been advised otherwise by a qualified medical professional. I consent to receive medical treatment deemed necessary if I am injured or require medical attention during my participation in surfing lessons. I understand that I am responsible for all costs associated with such medical treatment.</p>

<p><span className="bold">7. Photography/Video Release:</span> I agree to allow the Surf School, its representatives, or participants the right to take photographs and videos of me during the surfing lessons. I agree that these materials may be used for promotional or marketing purposes by the Surf School.</p>

<p>This Waiver and Release of Liability shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law.</p>

<p><span className="bold">I HAVE READ THIS RELEASE OF LIABILITY AND ASSUMPTION OF RISK AGREEMENT, FULLY UNDERSTAND ITS TERMS, UNDERSTAND THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT.</span></p>

        </div>

          <h2 className="text-lg font-bold">Cancellation Policy</h2>
          <p>If you need to cancel your booking, please notify us at least 24 hours before your scheduled lesson to avoid any fees. Cancellations must be made either by email to <a href="mailto:surfkludyville@gmail.com" className="text-blue-500 hover:underline">surfkludyville@gmail.com</a> or by calling us at <a href="tel:+16193949773" className="text-blue-500 hover:underline">619 394 9773</a>.</p>
          <p>In the event of a no-show or if cancellation notice is not provided at least 24 hours prior to the scheduled lesson, a $30 no-show fee will be applied, and the remaining balance of any pre-paid fee will be refunded.</p>
          <p>We understand that plans can change unexpectedly, and we aim to be as accommodating as possible within the constraints of our scheduling and commitments to instructors.</p>
       



        <div className="mb-4 mt-4">
          <input
            type="checkbox"
            id="waiverAgree"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="waiverAgree" className="ml-2">
            I AGREE to the terms and conditions and cancellation poilicy set forth in this Acknowledgment of Risks, Waiver of Liability, and Indemnification Agreement.
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!isChecked}
          >
            Agree and Continue
          </button>
        </div>
      </form>
      <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} SDRI</p>
      
      <Link href="/privacypolicy/">Privacy Policy</Link> 
    </footer>
    </div>
    
  );
};

export default Waiver;
