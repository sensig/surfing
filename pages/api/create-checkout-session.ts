// Importing necessary types from 'next' and the Stripe library
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

console.log(`Stripe secret key is set: ${!!process.env.STRIPE_SECRET_KEY}`);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });
  

// The handler function for the API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Create the Stripe Checkout Session with details from the request body
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: req.body.name || 'Booking', // Use data from the request, provide defaults as necessary
            },
            unit_amount: req.body.amount || 2000, // Amount in cents
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/payment-failed`,
        metadata: {
          // Additional metadata can be passed here if needed
          email: req.body.email,
          date: req.body.date,
          time: req.body.time,
        },
      });

      // Sending back the session ID to the client
      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error creating Stripe Checkout session:', error.message);
        res.status(500).json({ statusCode: 500, message: error.message });
      } else {
        console.error('An unexpected error occurred');
        res.status(500).json({ statusCode: 500, message: 'An unexpected error occurred' });
      }
    }
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
