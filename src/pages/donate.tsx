import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Donate: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState(25);
  const [donationType, setDonationType] = useState('Cost of education');
  const [donationFrequency, setDonationFrequency] = useState('Monthly');
  const navigate = useNavigate();

  const handleDonationAmountChange = (amount: number) => {
    setDonationAmount(amount);
  };

  const handleDonationFrequencyChange = (frequency: string) => {
    setDonationFrequency(frequency);
  };

  const handleDonationTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDonationType(event.target.value);
  };

  return (
    <div className="h-auto lg:h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute top-3 left-3">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center space-x-3 text-gray-600 font-semibold">
          <FaArrowLeft />
          <p>Back</p>
        </button>
      </div>
      <div className='w-full mt-10 md:mt-10 lg:mt-0 flex flex-col items-center justify-center'>
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold">Donate To Our Young Africans</h1>
        </div>
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">Why donate?</h2>
          <p className="text-gray-600 px-[8%]">
            Unlock your true potential by discovering what you love and excel at. Our platform connects you with expert mentors
            who guide you to achieve your career goals and make a meaningful impact in the world.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 border border-blue-200 p-2 rounded-xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img src="/svgs/donate.svg" alt="Donate Illustration" className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2">
          <div>
            <img src="/icons/logo-b.svg" alt="Donate Illustration" className="py-2 h-auto" />
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Welcome to heavenchild donation, please fill out the form below Hopefully it is blessed.</p>
          </div>
          <form>
            <div className="w-3/5 mb-4">
              <label className="block mb-1 font-semibold">Choose a donation type</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                value={donationType}
                onChange={handleDonationTypeChange}
              >
                <option value="Cost of education">Cost of education</option>
                <option value="School supplies">School supplies</option>
                <option value="General support">General support</option>
              </select>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Choose a donation amount</h3>
              <div className="flex flex-col space-y-2">
                {[25, 50, 100].map((amount) => (
                  <label key={amount} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="donation-amount"
                      value={amount}
                      checked={donationAmount === amount}
                      onChange={() => handleDonationAmountChange(amount)}
                      className="form-radio text-blue-500 cursor-pointer"
                    />
                    <span className={`font-bold text-lg`}>${amount}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-blue-500 cursor-pointer">
                Enter a custom donation amount
              </label>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Choose a donation frequency</h3>
              <div className="flex space-x-4">
                <label className={`flex space-x-2  ${donationFrequency === 'Monthly' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} px-10 py-2 rounded-lg cursor-pointer`}>
                  <input
                    type="radio"
                    name="donation-frequency"
                    value="Monthly"
                    checked={donationFrequency === 'Monthly'}
                    onChange={() => handleDonationFrequencyChange('Monthly')}
                    className="form-radio text-blue-500 cursor-pointer"
                  />
                  <span>Monthly</span>
                </label>
                <label className={`flex space-x-2  ${donationFrequency === 'One time' ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} px-10 py-2 rounded-lg cursor-pointer`}>
                  <input
                    type="radio"
                    name="donation-frequency"
                    value="One time"
                    checked={donationFrequency === 'One time'}
                    onChange={() => handleDonationFrequencyChange('One time')}
                    className="form-radio text-blue-500 cursor-pointer"
                  />
                  <span>One time</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="px-6 py-2 text-blue-500 font-semibold border-2 border-blue-500 rounded-lg hover:bg-gray-200">Cancel</button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Go checkout</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;
