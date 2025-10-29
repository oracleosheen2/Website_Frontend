"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Star,
  ArrowLeft,
  Shield,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: {
    id: string;
  };
}

const zodiacData = [
  {
    id: 1,
    name: "Aries",
    date: "Mar 21 - Apr 19",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-ppp.jpg",
    description: "Start your journey with courage and energy.",
    traits: ["Courageous", "Energetic", "Pioneering"],
    element: "Fire",
    planet: "Mars",
  },
  {
    id: 2,
    name: "Taurus",
    date: "Apr 20 - May 20",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-pp.png",
    description: "Steadiness and patience will guide you.",
    traits: ["Reliable", "Patient", "Practical"],
    element: "Earth",
    planet: "Venus",
  },
  {
    id: 3,
    name: "Gemini",
    date: "May 21 - Jun 20",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-ddd.jpg",
    description: "Embrace curiosity and adaptability.",
    traits: ["Adaptable", "Curious", "Communicative"],
    element: "Air",
    planet: "Mercury",
  },
  {
    id: 4,
    name: "Cancer",
    date: "Jun 21 - Jul 22",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-l.jpg",
    description: "Trust your intuition and emotions.",
    traits: ["Intuitive", "Emotional", "Protective"],
    element: "Water",
    planet: "Moon",
  },
  {
    id: 5,
    name: "Leo",
    date: "Jul 23 - Aug 22",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-eee.jpg",
    description: "Confidence and creativity lead the way.",
    traits: ["Confident", "Creative", "Generous"],
    element: "Fire",
    planet: "Sun",
  },
  {
    id: 6,
    name: "Virgo",
    date: "Aug 23 - Sep 22",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-pppp.jpg",
    description: "Focus on details and practical solutions.",
    traits: ["Analytical", "Practical", "Helpful"],
    element: "Earth",
    planet: "Mercury",
  },
  {
    id: 7,
    name: "Libra",
    date: "Sep 23 - Oct 22",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-dddd.jpg",
    description: "Balance and harmony will guide decisions.",
    traits: ["Diplomatic", "Social", "Fair-minded"],
    element: "Air",
    planet: "Venus",
  },
  {
    id: 8,
    name: "Scorpio",
    date: "Oct 23 - Nov 21",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-q.jpg",
    description: "Passion and transformation await you.",
    traits: ["Passionate", "Determined", "Intense"],
    element: "Water",
    planet: "Pluto",
  },
  {
    id: 9,
    name: "Sagittarius",
    date: "Nov 22 - Dec 21",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-m.jpg",
    description: "Adventure and optimism will thrive.",
    traits: ["Adventurous", "Optimistic", "Philosophical"],
    element: "Fire",
    planet: "Jupiter",
  },
  {
    id: 10,
    name: "Capricorn",
    date: "Dec 22 - Jan 19",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-hh.jpg",
    description: "Discipline and persistence will pay off.",
    traits: ["Disciplined", "Patient", "Ambitious"],
    element: "Earth",
    planet: "Saturn",
  },
  {
    id: 11,
    name: "Aquarius",
    date: "Jan 20 - Feb 18",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-ppp.jpg",
    description: "Innovation and originality are key.",
    traits: ["Innovative", "Original", "Independent"],
    element: "Air",
    planet: "Uranus",
  },
  {
    id: 12,
    name: "Pisces",
    date: "Feb 19 - Mar 20",
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-pp.png",
    description: "Imagination and compassion lead the way.",
    traits: ["Compassionate", "Imaginative", "Intuitive"],
    element: "Water",
    planet: "Neptune",
  },
];

const astrologers = [
  {
    id: 1,
    name: "Priya Sharma",
    experience: "12+ years",
    specialization: "Vedic Astrology",
    rating: 4.9,
    reviews: 1247,
    price: 799,
    image: "/api/placeholder/100/100",
    languages: ["Hindi", "English"],
    availableSlots: ["10:00 AM", "2:00 PM", "4:30 PM", "7:00 PM"],
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    experience: "15+ years",
    specialization: "Numerology",
    rating: 4.8,
    reviews: 892,
    price: 699,
    image: "/api/placeholder/100/100",
    languages: ["Hindi", "Tamil"],
    availableSlots: ["9:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"],
  },
  {
    id: 3,
    name: "Anita Desai",
    experience: "8+ years",
    specialization: "Tarot Reading",
    rating: 4.7,
    reviews: 567,
    price: 899,
    image: "/api/placeholder/100/100",
    languages: ["English", "Marathi"],
    availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"],
  },
];

const BookingPage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [selectedAstrologer, setSelectedAstrologer] = useState<number | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const card = zodiacData.find((c) => c.id === Number(id));

  // Available dates for next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Zodiac Sign Not Found
          </h1>
          <button
            onClick={() => router.push("/catalogue")}
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Back to Catalogue
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final booking submission
      alert(
        `Booking confirmed for ${card.name} reading with ${
          astrologers.find((a) => a.id === selectedAstrologer)?.name
        }`
      );
    }
  };

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-br from-pink-50 to-amber-50">
      {/* Header */}
     
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-pink-500 to-amber-500 border-transparent text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      currentStep > step
                        ? "bg-gradient-to-r from-pink-500 to-amber-500"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Choose Astrologer</span>
            <span>Select Slot</span>
            <span>Your Details</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Zodiac Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover rounded-full border-4 border-amber-200"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {card.name}
                </h1>
                <p className="text-amber-600 font-semibold mb-4">{card.date}</p>
                <p className="text-gray-600 mb-6">{card.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <span className="block text-sm text-gray-600">Element</span>
                    <span className="font-semibold text-amber-600">
                      {card.element}
                    </span>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <span className="block text-sm text-gray-600">Planet</span>
                    <span className="font-semibold text-pink-600">
                      {card.planet}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Key Traits
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {card.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-amber-100 text-gray-700 rounded-full text-sm"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Booking Process */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Choose Astrologer */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Choose Your Astrologer
                </h2>
                <div className="space-y-4">
                  {astrologers.map((astrologer) => (
                    <div
                      key={astrologer.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedAstrologer === astrologer.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => setSelectedAstrologer(astrologer.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-gray-800">
                              {astrologer.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-semibold">
                                {astrologer.rating}
                              </span>
                              <span className="text-gray-500">
                                ({astrologer.reviews})
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600">
                            {astrologer.specialization}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-500">
                              {astrologer.experience} experience
                            </span>
                            <span className="text-sm text-gray-500">
                              Languages: {astrologer.languages.join(", ")}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">
                            ₹{astrologer.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            per session
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Select Date & Time
                </h2>

                {/* Date Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Select Date
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {availableDates.map((date) => {
                      const dateObj = new Date(date);
                      const isSelected = selectedDate === date;
                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            isSelected
                              ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <div className="text-sm font-semibold">
                            {dateObj.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </div>
                          <div className="text-lg">{dateObj.getDate()}</div>
                          <div className="text-xs">
                            {dateObj.toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {astrologers
                      .find((a) => a.id === selectedAstrologer)
                      ?.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-4 rounded-lg text-center transition-all ${
                            selectedSlot === slot
                              ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <Clock className="w-4 h-4 inline mr-2" />
                          {slot}
                        </button>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Your Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Date *
                    </label>
                    <input
                      type="date"
                      value={userDetails.birthDate}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          birthDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Booking Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Zodiac Reading:</span>
                      <span className="font-semibold">{card.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Astrologer:</span>
                      <span className="font-semibold">
                        {
                          astrologers.find((a) => a.id === selectedAstrologer)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span className="font-semibold">
                        {new Date(selectedDate).toLocaleDateString()} at{" "}
                        {selectedSlot}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-amber-600 border-t pt-2 mt-2">
                      <span>Total Amount:</span>
                      <span>
                        ₹
                        {
                          astrologers.find((a) => a.id === selectedAstrologer)
                            ?.price
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    Secure Payment
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    100% Confidential
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  currentStep > 1 && setCurrentStep(currentStep - 1)
                }
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  currentStep > 1
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>

              <button
                onClick={handleBooking}
                disabled={
                  (currentStep === 1 && !selectedAstrologer) ||
                  (currentStep === 2 && (!selectedDate || !selectedSlot)) ||
                  (currentStep === 3 &&
                    (!userDetails.name ||
                      !userDetails.email ||
                      !userDetails.phone ||
                      !userDetails.birthDate))
                }
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-full font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 3 ? "Confirm Booking" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
