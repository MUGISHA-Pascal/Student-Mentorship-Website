import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { Dialog } from '@headlessui/react'


export default function ProfileSetupPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);

  const steps = [
    { title: 'Coach profile setup', description: 'Enter Your Personal details' },
    { title: 'Setup Your Profile', description: 'Select the careers you are fit to coach in' },
    { title: 'Enter your working experience', description: 'Add your work history' },
  ]

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="relative h-[600px] bg-gradient-to-b from-blue-100 to-blue-50 p-8">
            <div className="relative z-10">
              <div className="mb-8 flex items-center justify-between">
                <button onClick={handlePrevious} className="rounded-full bg-white p-2 shadow-md">
                  <ChevronLeftIcon className="h-6 w-6 text-blue-500" />
                </button>
                <div className="flex-1 px-4">
                  <div className="relative flex items-center justify-between">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                          index + 1 <= step ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                    <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-gray-300" />
                    <div
                      className="absolute left-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-blue-500 transition-all duration-300 ease-in-out"
                      style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-10" />
              </div>
              <h2 className="mb-2 text-2xl font-bold">{steps[step - 1].title}</h2>
              <p className="mb-6 text-sm text-gray-600">{steps[step - 1].description}</p>
              {step === 1 && <PersonalDetailsForm />}
              {step === 2 && <CareerSelectionForm />}
              {step === 3 && <WorkExperienceForm />}
              <div className="mt-8 flex justify-between">
                <div />
                <button
                  onClick={handleNext}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  {step === steps.length ? 'Finish Setup' : 'Continue'}
                </button>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <p className="text-sm text-gray-600">
                "Some Quote to inspire the user on the progress and setup of the account"
              </p>
              <p className="text-xs text-gray-500">- Author</p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
function PersonalDetailsForm() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Enter First Name"
          className="w-1/2 rounded border p-2"
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          className="w-1/2 rounded border p-2"
        />
      </div>
      <input
        type="email"
        placeholder="Confirm Your Email Address"
        className="w-full rounded border p-2"
      />
      <textarea
        placeholder="Enter Your Short Bio"
        className="h-32 w-full rounded border p-2"
      />
    </div>
  )
}

function CareerSelectionForm() {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search and select the careers that you are fit to coach in"
        className="w-full rounded border p-2"
      />
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
          UI/UX Design <button className="ml-2 text-blue-500">×</button>
        </span>
      </div>
      <button className="mt-4 rounded bg-blue-100 px-4 py-2 text-blue-800">
        Upload a CV showing your proficiency
      </button>
    </div>
  )
}

function WorkExperienceForm() {
  return (
    <div className="space-y-4">
      <select className="w-full rounded border p-2">
        <option>Select Your Career</option>
      </select>
      <div className="flex space-x-4">
        <input type="date" className="w-1/2 rounded border p-2" placeholder="From" />
        <input type="date" className="w-1/2 rounded border p-2" placeholder="To" />
      </div>
      <button className="rounded bg-blue-500 px-4 py-2 text-white">Add</button>
      <div className="mt-4 rounded bg-white p-4 shadow">
        <h3 className="mb-2 font-semibold">Experience Timeline</h3>
        <ul className="space-y-2">
          <li className="flex justify-between text-sm">
            <span>Musician Manager At Hope Music</span>
            <span>2018 - 2024</span>
          </li>
        </ul>
      </div>
    </div>
  )
}