import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import emailjs from 'emailjs-com';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
    api: {
        bodyParser: false,
    },
};

const sendConfirmationEmail = async (session: Stripe.Checkout.Session) => {
    // Your EmailJS user ID
    const userID = process.env.EMAILJS_USER_ID!;
    // Your EmailJS service ID
    const serviceID = process.env.EMAILJS_SERVICE_ID!;
    // Your EmailJS template ID
    const templateID = process.env.EMAILJS_TEMPLATE_ID!;

    const templateParams = {
        // Replace these with the actual email template variables
        to_name: "Customer Name",
        to_email: "customer@example.com",
        session_id: session.id,
    };

    try {
        // Initialize EmailJS - only required if you haven't already done this elsewhere in your app
        // emailjs.init(userID); // Uncomment if not initialized elsewhere

        const result = await emailjs.send(serviceID, templateID, templateParams, userID);
        console.log("Email sent successfully", result.text);
    } catch (error) {
        console.error("Failed to send email", error);
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).send("Only POST requests allowed");
    }

    const sig = req.headers["stripe-signature"];
    if (typeof sig !== "string") {
        return res.status(400).send("Stripe signature header missing or invalid");
    }

    const rawBody = await getRawBody(req);

    try {
        const event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log(`Payment for session ${session.id} was successful!`);
            console.log("Fulfilling order", session.id);

            // Send confirmation email
            await sendConfirmationEmail(session);

            return res.json({ received: true });
        }
    } catch (err) {
        const error = err as Error;
        console.error(`Webhook Error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
}
