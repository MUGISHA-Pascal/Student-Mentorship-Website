/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


function StudentWaitingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="max-w-7xl mx-auto bg-white border border-blue-200 rounded-xl flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <img
            src="/icons/logo.svg?height=40&width=40"
            alt="GOYoungAfrica Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold font-sans">
            <span className="text-orange-500">GOY</span>
            <span className="text-black">oung</span>
            <span className="text-orange-500">A</span>
            <span className="text-blue-500">frica</span>
          </span>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => navigate('/donate')}
        >
          Donate
        </Button>
      </header>

      <main className="max-w-7xl mx-auto mt-8 text-center relative">
        <div className="max-w-3xl mx-auto mb-12">
          <img
            src="/images/done.png?height=600&width=800"
            alt="Collaboration Illustration"
            width={800}
            height={600}
            className="w-full"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">
            <span className="text-orange-500">Hang tight!</span>
            <span className="text-gray-900"> Your journey is about to begin.</span>
          </h1>

          <p className="text-lg font-semibold text-gray-800">
            🎉 You are now part of the <span className="text-blue-600">first cohort</span> starting this <span className="text-orange-500">summer!</span>
          </p>
          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 rounded-full h-3 relative">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${step >= 3 ? "w-full bg-green-500" : step === 2 ? "w-2/3 bg-yellow-500" : "w-1/3 bg-orange-500"
                }`}
            ></div>
          </div>
          <p className="text-lg font-medium text-gray-900">
            {step === 1 && "Your application is under review."}
            {step === 2 && "Matching you with a mentor..."}
            {step === 3 && "Almost there! Check your email soon."}
          </p>

          {/* Back to Site */}
          <div className="mt-6">
            <Button
              className="bg-gray-600 hover:bg-gray-700 text-white px-8"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentWaitingPage