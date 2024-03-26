import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from 'react';
import initializeOneSignal from '../utils/initOneSignal'; // Adjust the path as necessary

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize OneSignal for push notifications.
    initializeOneSignal().catch(err => console.error("OneSignal initialization failed:", err));
  }, []);

  return <Component {...pageProps} />;
}
