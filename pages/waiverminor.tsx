import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import emailjs from 'emailjs-com';
import Link from 'next/link';



const WaiverMinor = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const router = useRouter();
  const { email } = router.query; // Assuming you're passing the participant's email as a way to identify the booking.

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleBack = () => {
    router.push('/database');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!isChecked) {
      alert("Please agree to the waiver terms before proceeding.");
      return;
    }

    try {
      // Update the booking with the parent's name, email, and the minor's waiver agreement
      const { error } = await supabase
        .from('bookings')
        .update({
          minorAgree: true,
          pname: parentName,
          pemail: parentEmail
        })
        .match({ email: email as string }); // Ensure `email` is correctly cast or checked to be a string.

      if (error) {
        console.error('Supabase error:', error.message);
        alert(`Error: ${error.message}`);
        return;
      }

      // Sending the confirmation email using EmailJS
      const templateParams = {
        to_name: parentName,
        to_email: parentEmail,
        subject: "Minor's Surfing Lesson Waiver Agreement Confirmation",
        message: `You have agreed to the waiver terms on behalf of your child. This email confirms that ${parentName} has given permission for their child to participate in surfing lessons.`,
      };

      emailjs.send('service_arlnk8o', 'template_9lbxd5i', templateParams, 'tnYjhNlQa8ObtYMid'
      )
        .then((response) => {
          console.log('Email successfully sent!', response.text);
          // Navigate to the Stripe Checkout page
          window.location.href = 'https://buy.stripe.com/test_6oEbKvcZs8tn4Jq000';
        }, (err) => {
          console.error('Failed to send email. Error:', err);
          alert('Failed to send confirmation email.');
        });

    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
};


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold mb-4">Parental Consent Liability Waiver</h1>
      <form onSubmit={handleSubmit}>
       
      <p>In consideration of my child(ren) being allowed to participate in any way in the surfing lessons, activities, and programs of <strong>Kludyville Surf School</strong> (&quot;Surf School&quot;) and to use its equipment and facilities, I acknowledge, appreciate, and agree to the following conditions:</p>

<p><strong>1. Acknowledgment of Risks:</strong> I understand and acknowledge that surfing involves risks that may lead to bodily injury, illness, death, or property damage. These risks include, but are not limited to, ocean conditions, marine life interactions, contact with other participants, equipment failure, and weather conditions. I understand that these risks may be present before, during, and after participation in surfing lessons.</p>

<p><strong>2. Assumption of Risk:</strong> I willingly agree to assume all risks associated with my child(ren)&apos;s participation in surfing lessons, including those risks that may result from the negligence of the Surf School, its instructors, employees, or agents.</p>

<p><strong>3. Waiver of Liability:</strong> I, for myself and on behalf of my child(ren) and our heirs, assigns, personal representatives, and next of kin, hereby release, indemnify, and hold harmless the Surf School, its officers, officials, agents, and/or employees, other participants, sponsoring agencies, sponsors, advertisers, and if applicable, owners and lessors of premises used to conduct the event (&quot;Releasees&quot;), from any and all liability for injury, disability, death, or loss or damage to person or property, whether caused by the negligence of the releasees or otherwise, to the fullest extent permitted by law.</p>

<p><strong>4. Medical Release:</strong> I certify that my child(ren) are physically fit and have not been advised otherwise by a qualified medical professional. I consent to receive medical treatment deemed necessary if my child(ren) are injured or require medical attention during their participation in surfing lessons. I understand that I am responsible for all costs associated with such medical treatment.</p>

<p><strong>5. Indemnification:</strong> I agree to indemnify and defend the Surf School against all claims, causes of action, damages, judgments, costs, or expenses, including attorney fees and other litigation costs, which may in any way arise from my or my familys use of or presence upon the facilities of the Surf School.</p>

<p>This Waiver and Release of Liability shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law.</p>

<p><strong>I HAVE READ THIS RELEASE OF LIABILITY AND ASSUMPTION OF RISK AGREEMENT, FULLY UNDERSTAND ITS TERMS, UNDERSTAND THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING IT, AND SIGN IT FREELY AND VOLUNTARILY WITHOUT ANY INDUCEMENT.</strong></p>


<h2 className="text-lg font-bold mt-4 ">Cancellation Policy</h2>
          <p>If you need to cancel your booking, please notify us at least 24 hours before your scheduled lesson to avoid any fees. Cancellations must be made either by email to <a href="mailto:surfkludyville@gmail.com" className="text-blue-500 hover:underline">surfkludyville@gmail.com</a> or by calling us at <a href="tel:+16193949773" className="text-blue-500 hover:underline">619 394 9773</a>.</p>
          <p>In the event of a no-show or if cancellation notice is not provided at least 24 hours prior to the scheduled lesson, a $30 no-show fee will be applied, and the remaining balance of any pre-paid fee will be refunded.</p>
          <p>We understand that plans can change unexpectedly, and we aim to be as accommodating as possible within the constraints of our scheduling and commitments to instructors.</p>
       

        <p>Please fill out this form to give consent for your child to participate in surfing lessons.</p>
        <div className="mb-4 mt-4">
          <label htmlFor="parentName" className="block text-sm font-bold text-gray-700">Parents Name:</label>
          <input
            type="text"
            id="parentName"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="parentEmail" className="block text-sm font-bold text-gray-700">Parent&apos;s Email:</label>
          <input
            type="email"
            id="parentEmail"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        
        <div className="mb-4">
          <input
            type="checkbox"
            id="waiverAgree"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="waiverAgree" className="ml-2">
            I, the undersigned, agree to the terms and conditions set forth in this Acknowledgment of Risks, Waiver of Liability, and Indemnification Agreement, and give permission for my child to participate in surfing lessons.
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
            Checkout
          </button>
        </div>
      </form>
      <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} SDRI</p>
      <p>
      <Link href="/privacypolicy/">Privacy Policy</Link> </p>
    </footer>
    </div>
  );
};

export default WaiverMinor;
