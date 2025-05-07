import { cn } from '@/lib/utils';
import { LucideIcon, icons } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomeCardProps {
  className?: string;
  icon: keyof typeof icons; // e.g., "Video", "Calendar"
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, icon, title, description, handleClick }: HomeCardProps) => {
  const Icon = icons[icon] as LucideIcon;

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'bg-orange-1 cursor-pointer flex flex-col justify-between min-h-[200px] xl:max-w-[240px] transition hover:shadow-md',
        className
      )}
    >
      <CardContent className="p-6 flex flex-col gap-6 h-full justify-between">
        <div className="flex items-center justify-center bg-muted size-10 rounded-xl ">
          <Icon size={27} strokeWidth={2.5} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-base font-normal">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
