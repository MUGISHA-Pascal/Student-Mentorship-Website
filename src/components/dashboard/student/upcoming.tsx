import { FaPlus } from 'react-icons/fa';

interface Event {
  title: string;
  subtitle: string;
}

const Upcoming = () => {
  const events: Event[] = [
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
    { title: 'Meeting With The Students', subtitle: 'More Students this year' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Upcoming</h2>
        <a href="/student/dashboard/calendar" className="text-blue-500 font-medium">Full Calendar</a>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white py-3 px-14 shadow-md rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img src="/svgs/upcoming.svg" alt="event icon" className="" />
              <div>
                <p className="font-semibold text-gray-700">{event.title}</p>
                <p className="text-sm text-gray-400">{event.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors" title='New Action'>
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default Upcoming;