import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './emblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

interface Testimonial {
  id: number
  name: string
  text: string
  rating: number
  imageUrl: string
}

type PropType = {
  testimonials: Testimonial[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { testimonials, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((testimonial) => (
            <div className="embla__slide" key={testimonial.id}>
              <div className="embla__slide__content p-5 bg-white shadow-lg rounded-lg">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="rounded-full w-16 h-16 mx-auto"
                />
                <h3 className="text-center text-lg font-semibold mt-4">
                  {testimonial.name}
                </h3>
                <p className="text-center text-gray-500 my-2">{testimonial.text}</p>
                <div className="flex justify-center mt-4">
                  {Array(testimonial.rating)
                    .fill("")
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel