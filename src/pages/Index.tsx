
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QrCode, Camera, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  Share Your Event Photos <span className="text-brand-teal">Instantly</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-md">
                  Trino Share helps photographers instantly share event photos with guests using AI face recognition.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-brand-teal hover:bg-brand-teal/90" asChild>
                    <Link to="/scan">
                      <QrCode className="mr-2 h-4 w-4" />
                      Scan QR Code
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admin/login">
                      <Lock className="mr-2 h-4 w-4" />
                      Photographer Login
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600" 
                    alt="Wedding photo" 
                    className="rounded-lg shadow-lg object-cover w-full max-w-lg mx-auto" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 z-0 w-full h-full bg-brand-teal rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <QrCode className="h-10 w-10 text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
                <p className="text-gray-600">
                  Scan the QR code displayed at your event to access the photo gallery.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Camera className="h-10 w-10 text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Take a Selfie</h3>
                <p className="text-gray-600">
                  Our AI face recognition identifies you in event photos.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Enjoy Your Photos</h3>
                <p className="text-gray-600">
                  View and download your photos with automatic watermarking.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to try it out?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
              Experience how Trino Share can transform your event photo sharing.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-brand-teal hover:bg-brand-teal/90" asChild>
                <Link to="/scan">
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/login">
                  <Lock className="mr-2 h-4 w-4" />
                  Photographer Login
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
