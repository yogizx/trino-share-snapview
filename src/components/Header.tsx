
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className={cn("w-full bg-white shadow-sm sticky top-0 z-50", className)}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/logo.svg" 
            alt="Trino Share Logo"
            width={40}
            height={40}
            onError={(e) => {
              // Fallback if logo doesn't exist
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-xl font-bold text-brand-blue">Trino Share</h1>
        </div>
        
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </Button>
        </div>
        
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0`}>
          <a href="/" className="text-brand-blue hover:text-brand-teal transition-colors">Home</a>
          <a href="/about" className="text-brand-blue hover:text-brand-teal transition-colors">About</a>
          <a href="/contact" className="text-brand-blue hover:text-brand-teal transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
