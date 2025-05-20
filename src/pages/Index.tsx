
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QrCode, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const handleStartScanning = () => {
    navigate('/scan');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-blue to-brand-purple text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Access Your Event Photos Instantly</h1>
              <p className="text-xl mb-8">Scan, Recognize, Download. It's that simple.</p>
              <Button 
                className="bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold px-8 py-6 text-lg"
                onClick={handleStartScanning}
              >
                Start Scanning
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <QrCode className="h-6 w-6 text-brand-blue" />
                  </div>
                  <CardTitle>Scan QR Code</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Find the QR code displayed at your event and scan it with your phone camera.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Camera className="h-6 w-6 text-brand-blue" />
                  </div>
                  <CardTitle>Take a Selfie</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Take a quick selfie so our AI can find photos featuring you from the event.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-blue">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <CardTitle>Download & Share</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">
                    Access and download your photos immediately with professional watermarking.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Trino Share</h2>
              <p className="text-gray-600">
                Our platform provides seamless photo sharing for events with cutting-edge technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex">
                <div className="mr-4 text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="m12 15 2 2 4-4"></path>
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
                  <p className="text-gray-600">
                    No waiting for photographers to edit and share. Get your photos immediately.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M22 12h-4"></path>
                    <path d="M6 12H2"></path>
                    <path d="M12 6V2"></path>
                    <path d="M12 22v-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Facial Recognition</h3>
                  <p className="text-gray-600">
                    Advanced AI identifies you in photos so you only see relevant images.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <path d="m21 15-5-5L5 21"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                  <p className="text-gray-600">
                    All photos are high-resolution with professional watermarking.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 text-brand-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                  <p className="text-gray-600">
                    Download and share photos directly from the platform to social media.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-brand-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Trino Share?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Try our seamless photo sharing experience at your next event.
            </p>
            <Button 
              className="bg-white text-brand-teal hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              onClick={handleStartScanning}
            >
              Start Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
