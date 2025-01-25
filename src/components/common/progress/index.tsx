import * as Slider from "@radix-ui/react-slider";

export const SliderDemo = () => (
  <Slider.Root
    className="relative flex h-5 w-[300px] touch-none select-none items-center"
    // defaultValue={[50]}
    value={[50]}
    max={100}
    dir="rtl"
    step={1}
  >
    <Slider.Track className="relative h-[6px] grow rounded-full bg-blue-500">
      <Slider.Range className="absolute h-full rounded-full bg-stone-100" />
    </Slider.Track>
    <Slider.Thumb
      className="block size-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_5px] focus:shadow-blackA5 focus:outline-none"
      aria-label="Volume"
    />
  </Slider.Root>
);
