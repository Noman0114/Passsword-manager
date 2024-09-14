'use client';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, RefreshCw, Smartphone, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Router, { useRouter } from "next/navigation";


export default function LandingPage() {
  const router= useRouter();
  return (
    <div className="flex flex-col min-h-screen">
    
      <main className="flex-1 flex flex-col items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Secure Your Digital Life
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Manage all your passwords in one secure place. Stay protected with SecurePass.
                </p>
              </div>
              <div className="space-x-4 flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" aria-label="Get Started">
                  Get Started
                </Button>
                <Button variant="outline" aria-label="Learn More">
                  Learn More
                </Button>
              </div>
            </div>
            
          </div>
          
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
              Why Choose SecurePass?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <Lock className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Unbreakable Encryption</h3>
                <p className="text-gray-500">Your data is protected with state-of-the-art encryption technology.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <RefreshCw className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Auto-Sync Across Devices</h3>
                <p className="text-gray-500">Access your passwords from anywhere, on any device.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Smartphone className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Mobile-Friendly</h3>
                <p className="text-gray-500">Seamless experience on both desktop and mobile devices.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Secure Your Passwords?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of users who trust SecurePass with their digital security.
                </p>
              </div>
             <Link href={'/login'}> <Button className="bg-blue-600 hover:bg-blue-700 mt-2" aria-label="Sign Up Now">
                Sign Up Now
              </Button></Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} SecurePass Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
