import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './emblaCarousel'
import '../../../styles/embla.css'

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

const testimonials = [
  {
    id: 1,
    name: "Timber Jones",
    text: "The coaching sessions were transformative. My goals became clear, and I now have actionable steps to achieve them.",
    rating: 5,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 2,
    name: "Jane Ally",
    text: "An excellent platform for personal growth. The coaches are highly skilled and supportive throughout the process.",
    rating: 4,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 3,
    name: "Alice Johnson",
    text: "Thanks to their coaching, I’ve gained confidence and clarity in both my personal and professional life.",
    rating: 5,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 4,
    name: "Mark Brown",
    text: "The sessions were insightful and motivating. I’ve seen noticeable improvements in my productivity and mindset.",
    rating: 4,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 5,
    name: "Hunk Thomas",
    text: "The coaches provided personalized guidance that helped me stay accountable and focused on my goals.",
    rating: 5,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 6,
    name: "Rachel Ella",
    text: "I’ve grown so much thanks to this platform. The coaching was practical and results-oriented.",
    rating: 4,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 7,
    name: "Alice Johnson",
    text: "The program helped me overcome obstacles that I struggled with for years. I’m now achieving things I never thought possible.",
    rating: 5,
    imageUrl: "/images/testimonial.png",
  },
  {
    id: 8,
    name: "Danny Goes",
    text: "I loved the flexibility of the sessions, and the coach tailored everything to my specific needs. Highly recommended!",
    rating: 4,
    imageUrl: "/images/testimonial.png",
  },
];



const Testimonial: React.FC = () => {
  return (
    <div>
        <EmblaCarousel  options={OPTIONS} testimonials={testimonials} />
    </div>
  )
}

export default Testimonial