import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/datepicker.css';

interface Activity {
  id: number;
  title: string;
  date: string;
}

const RecentMentorActivities: React.FC = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, title: 'Visit At The Piano School', date: '9/16/2024' },
    { id: 2, title: 'Visit At The Piano School', date: '9/16/2024' },
    { id: 3, title: 'Visit At The Piano School', date: '9/16/2024' },
    { id: 4, title: 'Visit At The Piano School', date: '9/16/2024' },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const clearAllActivities = () => {
    setActivities([]);
  };

  const removeActivity = (id: number) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [eventDate, setEventDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setEventDate(date);
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-5">
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            <span role="img" aria-label="recent">🕒</span> Recent Activities
          </h2>
          <button
            onClick={clearAllActivities}
            className="text-blue-500 hover:underline"
          >
            Clear All
          </button>
        </div>

        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                <p>{activity.title}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-gray-600">{activity.date}</p>
                <button onClick={() => removeActivity(activity.id)}>
                  <FaTrashAlt className="text-red-500 hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>


      <div className=" p-4">
        <div className="rounded-xl border shadow-md p-5">
          <div className="flex justify-between">
            <h3 className="text-blue-500 text-lg font-semibold">
              {selectedDate.toLocaleDateString('en-US')}
            </h3>
            <p className="text-gray-400">2 days away</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="p-2 rounded-lg border shadow">
              <h4 className="font-medium">Meeting With Students</h4>
              <p className="text-gray-500 text-sm">4:00pm</p>
            </div>
            <div className="p-2 rounded-lg border shadow">
              <h4 className="font-medium">Meeting With Students</h4>
              <p className="text-gray-500 text-sm">4:00pm</p>
            </div>
            <div className="p-2 rounded-lg border shadow">
              <h4 className="font-medium">Meeting With Students</h4>
              <p className="text-gray-500 text-sm">4:00pm</p>
            </div>
          </div>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          onClick={toggleModal}
        >
          + Add Event
        </button>
      </div>


      <div className="w-full">
        <Calendar
          // onChange={setSelectedDate}
          onChange={(value) => {
            if (value !== null) {
              setSelectedDate(new Date());
            }
          }}
          value={selectedDate}
          className="w-full shadow-md bg-transparent font-semibold rounded-lg p-2"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Schedule an Event</h2>

            {/* Form to schedule event */}
            <form onSubmit={() => { }}>
              <label className="block mb-2 text-sm font-medium">Event Title</label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full p-2 mb-4"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />

              <div className='h-auto mb-10'>
                <label className="block mb-2 text-sm font-medium">Select Date</label>
                <div className={`lg:w-1/2 md:w-1/2 w-full h-[6vh] cursor-pointer mt-3`}>
                  <div className="custom-datepicker w-full h-[55px] border border-gray-400 rounded-lg">
                    <DatePicker
                      selected={eventDate}
                      onChange={handleDateChange}
                      placeholderText="Select Event Date"
                      dateFormat="yyyy/MM/dd"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      minDate={new Date()}
                      className="custom-datepicker-input cursor-pointer w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentMentorActivities;