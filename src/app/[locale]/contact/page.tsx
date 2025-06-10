"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting AAZ Nextgen! We'll get back to you soon.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#6B21A8] mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Reach out to
          us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#6B21A8] mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  variant="primary"
                  placeholder="Enter your first name"
                  required
                  fullWidth
                />
                <Input
                  label="Last Name"
                  variant="primary"
                  placeholder="Enter your last name"
                  required
                  fullWidth
                />
              </div>
              <Input
                label="Email"
                variant="primary"
                type="email"
                placeholder="Enter your email"
                required
                fullWidth
                icon={<Mail className="h-5 w-5" />}
              />
              <Input
                label="Phone Number"
                variant="primary"
                type="tel"
                placeholder="Enter your phone number"
                fullWidth
                icon={<Phone className="h-5 w-5" />}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  className="border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg px-4 py-2 text-base transition-all duration-200 focus:outline-none w-full"
                  rows={5}
                  placeholder="Your message here..."
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#6B21A8] to-[#D63384] text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <p className="mb-8">
              We're here to help you with any questions about our programs,
              assessments, or learning platform.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-white/90">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-white/90">contact@aaznextgen.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-white/90">
                    123 Education Blvd
                    <br />
                    Learning City, LC 10101
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-[#6B21A8] mb-4">
              Follow Us
            </h2>
            <p className="text-gray-600 mb-6">
              Stay connected with AAZ Nextgen for updates, learning tips, and
              more.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline" size="lg" rounded className="gap-2">
                <Facebook className="h-5 w-5" />
                Facebook
              </Button>
              <Button variant="outline" size="lg" rounded className="gap-2">
                <Twitter className="h-5 w-5" />
                Twitter
              </Button>
              <Button variant="outline" size="lg" rounded className="gap-2">
                <Instagram className="h-5 w-5" />
                Instagram
              </Button>
              <Button variant="outline" size="lg" rounded className="gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
