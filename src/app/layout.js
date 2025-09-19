import "./globals.css";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Shopping App",
  description: "Built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {/* Add Toaster here */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                background: "#333",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
              },
            }}
          />
          <main className="min-h-screen bg-gray-100 text-gray-900">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
