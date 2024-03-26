import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'; // Import useRouter for checking the current path
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter(); // Use useRouter to access the current path

  // Function to determine if a tab is active based on the current route
  // Now correctly typed with 'path' as a string
  const isActive = (path: string): boolean => {
    return router.pathname === path;
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      {/* Tab Navigation, now with properly typed function call */}
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
        <div className="container mx-auto flex justify-center space-x-4 p-4">
          <Link href="/new-surf-lessons" legacyBehavior>
            <a className={`px-4 py-2 text-blue-600 hover:text-blue-800 ${isActive('/new-surf-lessons') ? 'border-b-2 border-blue-600' : ''}`}>New Surf Lessons</a>
          </Link>
          <Link href="/dhill-lessons"legacyBehavior>
            <a className={`px-4 py-2 text-blue-600 hover:text-blue-800 ${isActive('/dhill-lessons') ? 'border-b-2 border-blue-600' : ''}`}>DHill Lessons</a>
          </Link>
          <Link href="/database"legacyBehavior>
            <a className={`px-4 py-2 text-blue-600 hover:text-blue-800 ${isActive('/database') ? 'border-b-2 border-blue-600' : ''}`}>Database</a>
          </Link>
        </div>
      </nav>

      <div className="pt-16"> {/* Content adjusted for styling */}
        {/* Page Content */}
      </div>
    </main>
  );
}
