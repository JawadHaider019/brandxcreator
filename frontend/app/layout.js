import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FaqBot from "@/components/FaqBot";
export const metadata = {
  title: "BrandXCreator",
  description: "App Download and Info Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
<Navbar />
        {children}
        <FaqBot />
      <Footer /> 

      </body>
    </html>
  );
}
