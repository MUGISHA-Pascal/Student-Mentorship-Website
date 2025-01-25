import {
  GoActivityIcon,
  GoCoursesIcon,
  GoGraduateIcon,
  GoHeadgearIcon,
  GoMentorIcon,
  GoMiniCalendarIcon,
  GoScheduleTaskIcon,
} from "@/components/common/icons";
import { SliderDemo } from "@/components/common/progress";
import { StarRating } from "@/components/ui/star-rating";
import { useMemo } from "react";
import { CardProps, HeroCard } from "./components/hero-card";
import PerformanceStatistics from "./components/chart-statistics";

export default function CoachHome() {
  const heroCards = useMemo(
    () =>
      [
        {
          title: "Activities",
          subTitle: "Last week",
          value: 12,
          icon: GoActivityIcon,
        },
        {
          title: "Mentor-rate",
          icon: GoMentorIcon,
          subTitle: "Last week",
          value: "80%",
        },
        {
          title: "Students",
          icon: GoHeadgearIcon,
          subTitle: "Coached",
          value: "3",
        },
        {
          title: "Courses",
          icon: GoCoursesIcon,
          subTitle: "Provided",
          value: "12",
        },
      ] satisfies CardProps[],
    []
  );
  return (
    <main className="flex w-full flex-col min-h-full space-y-10 overflow-y-auto p-4">
      <section className="flex flex-col space-y-8">
        <header className="w-full flex space-x-3 items-center">
          <aside className="w-1/2">
            <article className="flex flex-col space-y-4">
              <header className="flex flex-col space-y-2">
                <span className="flex items-center space-x-2">
                  <p className="">{`Good morning, `}</p>
                  <p className="font-bold text-base text-blue-500">{`Mr. Oscar`}</p>
                  <StarRating
                    value={2}
                    numStars={5}
                    showcase
                    iconProps={{
                      className: "fill-yellow-500 stroke-yellow-500",
                    }}
                  />
                </span>
                <p className="text-xs text-neutral-600">
                  We are happy that you came back
                </p>
              </header>
              <ul className="flex flex-col space-y-3 mt-4">
                <li className="flex space-x-3 items-center">
                  <p className="text-neutral-600 w-32">{`On-going:`}</p>
                  <p className="text-neutral-700 font-bold">{`Intermediate Piano Course`}</p>
                </li>
                <li>
                  <SliderDemo />
                </li>
                <li className="flex space-x-3 items-center">
                  <p className="text-neutral-600 w-32">{`Start:`}</p>
                  <p className="text-blue-500 font-bold">{`4th September 2024`}</p>
                </li>
              </ul>
            </article>
          </aside>
          <aside className="w-1/2 bg-sky-100 rounded-xl flex items-center">
            <GoScheduleTaskIcon style={{ width: "227px", height: "168px" }} />
            <div className="flex flex-col space-y-8">
              <span className="flex flex-col space-y-2">
                <h1 className="font-bold font-neutral-800">
                  What are you doing Today?
                </h1>
                <p className="font-bold text-orange-700">9th/10/2024</p>
              </span>
              <div className="flex items-center space-x-2">
                <GoMiniCalendarIcon />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Meeting with The Musicians
                </label>
              </div>
            </div>
          </aside>
        </header>
        <footer className="grid grid-cols-4 gap-x-16">
          {heroCards.map((card) => (
            <HeroCard
              key={card.value}
              value={card.value}
              title={card.title}
              subTitle={card.subTitle}
              icon={card.icon}
            />
          ))}
        </footer>
      </section>
      <section className="w-full flex space-x-20">
        <aside className="flex flex-col space-y-3 w-full">
          <p className="font-bold text-neutral-800">Performance Statistics</p>
          <PerformanceStatistics />
        </aside>
        <aside className="flex flex-col w-2/5">
          <header className="flex w-full items-center p-1 mb-2">
            <p className="font-bold text-neutral-800 flex-1">Upcoming</p>
            <button className="text-xs text-blue-500 font-bold">
              Full Calendar
            </button>
          </header>
          <ul className="flex flex-col space-y-2">
            {[1, 2, 3, 4].map((e) => (
              <li
                className="flex p-2 space-x-2 rounded-xl border shadow-md items-center"
                key={e}
              >
                <GoGraduateIcon style={{ width: 60, height: 60 }} />
                <span className="">
                  <p className="font-bold text-lg">Meeting with</p>
                  <p className="font-bold text-lg">The Students</p>
                  <p className="text-sm">More Students this year</p>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      <section className="bg-fuchsia-200 w-full">{/* <ChartTest /> */}</section>
      <section className="flex flex-col space-y-5">
        <header className="flex items-center">
          <p className="font-bold text-neutral-800 flex-1">What is New?</p>
          <button className="text-xs text-blue-500 font-bold">
            Full Calender
          </button>
        </header>
        <div className="grid grid-cols-4 self-start gap-x-10 gap-y-4">
          {[1, 2, 3, 4, 0, 0, 0, 0].map((e) => (
            <img
              key={e}
              src="https://github.com/shadcn.png"
              alt=""
              className="size-52 rounded-lg"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
