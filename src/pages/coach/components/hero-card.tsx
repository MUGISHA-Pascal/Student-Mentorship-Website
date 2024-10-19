import { IconMethods, IconProps } from "@/components/common/icons";

export interface CardProps {
  value: string | number;
  title: string;
  subTitle: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<IconMethods>
  >;
}
export const HeroCard = (props: CardProps) => {
  return (
    <article className="rounded-lg bg-blue-100 flex space-x-6 px-7 py-5 items-center">
      <>{<props.icon />}</>
      <span className="flex flex-col space-y-1<span>icon</span>">
        <h1 className="font-bold text-4xl">{props.value}</h1>
        <p className="font-bold text-2xl text-blue-500">{props.title}</p>
        <p className="text-xs font-normal text-neutral-700">{props.subTitle}</p>
      </span>
    </article>
  );
};
