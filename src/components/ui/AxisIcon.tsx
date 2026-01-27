import { Brain, BookOpen, Code2 } from "lucide-react";

type IconName = "brain" | "journal" | "code";

interface AxisIconProps {
  name: IconName;
  className?: string;
}

export const AxisIcon = ({ name, className = "h-6 w-6" }: AxisIconProps) => {
  const icons = {
    brain: Brain,
    journal: BookOpen,
    code: Code2,
  };

  const Icon = icons[name];
  return <Icon className={className} />;
};
