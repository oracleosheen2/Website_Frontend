"use client";
import {
  benefits,
  MembershipPlan,
  membershipPlans,
  stats,
  testimonials,
  FormDataType,
} from "@/utils/member";
import React, { useState, ChangeEvent, FormEvent } from "react";

const BecomeAMember: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    plan: "premium",
    newsletter: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlanSelect = (planId: string): void => {
    setFormData((prev: FormDataType) => ({ ...prev, plan: planId }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      `🎉 Welcome to Osheen Oracle, ${formData.name}! Your ${
        membershipPlans.find((p) => p.id === formData.plan)?.name
      } membership is now active!`
    );
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen  font-body">
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="fixed bottom-40 right-20 w-16 h-16 bg-indigo-300 rounded-full opacity-30 blur-lg animate-bounce"></div>
      <div className="fixed top-1/3 right-1/4 w-12 h-12 bg-cyan-300 rounded-full opacity-40 blur-md animate-pulse"></div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-100/20 to-cyan-100/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-100/50 border border-blue-200 mb-8">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-ping"></span>
            <span className="text-blue-700 font-medium text-sm">
              Join 5,000+ Tech Professionals
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight font-heading">
            Unlock Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Tech Potential
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-700/80 mb-12 max-w-3xl mx-auto leading-relaxed font-normal">
            Join Osheen Oracle&rsquo;s elite community where innovation meets
            expertise. Accelerate your tech career with cutting-edge resources
            and mentorship.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-blue-700/70 font-medium mt-1 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-heading">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Tech Journey
              </span>
            </h2>
            <p className="text-lg text-blue-700/80 max-w-2xl mx-auto font-normal">
              Each plan is designed to elevate your technical skills and career
              growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 backdrop-blur-sm ${
                  plan.popular
                    ? "bg-white/80 border-2 border-cyan-300 shadow-xl transform lg:scale-105 z-10"
                    : "bg-white/60 border border-blue-100 shadow-lg"
                } transition-all duration-300 hover:shadow-2xl hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                      ⭐ Most Popular ⭐
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-subheading">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-blue-600 ml-1 text-lg">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-left">
                      <span className="text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-sm">
                        💻
                      </span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 shadow-md hover:shadow-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                      : "bg-gradient-to-r from-blue-400 to-indigo-400 text-white hover:from-blue-500 hover:to-indigo-500"
                  } transform hover:scale-105`}
                >
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-heading">
              Osheen Oracle{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Advantages
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-subheading">
                  {benefit.title}
                </h3>
                <p className="text-blue-700/80 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-100/30 to-cyan-100/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight font-heading">
              Success Stories from{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Our Members
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-3">{testimonial.avatar}</div>
                <p className="text-blue-700/80 mb-4 italic text-sm leading-relaxed">
                  {testimonial.content}
                </p>
                <div>
                  <div className="font-bold text-gray-900 text-base font-subheading">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 md:p-10 border border-blue-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight font-heading">
                Start Your{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Tech Transformation
                </span>
              </h2>
              <p className="text-lg text-blue-700/80 font-normal">
                Join Osheen Oracle and unlock your potential in the tech
                industry
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-blue-700 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm"
                  placeholder="Your contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-3">
                  Choose Your Tech Plan
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {membershipPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                        formData.plan === plan.id
                          ? "border-blue-400 bg-blue-50/50 shadow-md"
                          : "border-blue-200 bg-white/50 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-900 text-sm font-subheading">
                          {plan.name}
                        </span>
                        <span className="text-blue-600 font-bold text-sm">
                          {plan.price}/{plan.period}
                        </span>
                      </div>
                      <div className="text-xs text-blue-600">
                        {plan.features.length} tech features
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-500 border-blue-300 rounded focus:ring-blue-400"
                />
                <label
                  htmlFor="newsletter"
                  className="ml-3 text-sm text-blue-700"
                >
                  Receive weekly tech insights, coding tips, and exclusive
                  Osheen Oracle updates
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-8 rounded-xl font-semibold text-base hover:from-blue-600 hover:to-cyan-600 transform cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing Your Membership...
                  </span>
                ) : (
                  "🚀 Join Osheen Oracle Now 🚀"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeAMember;
