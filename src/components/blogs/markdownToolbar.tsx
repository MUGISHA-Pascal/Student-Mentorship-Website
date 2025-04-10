import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarkdownToolbarProps {
  onInsertMarkdown: (start: string, end?: string) => void;
}

const MarkdownToolbar = ({ onInsertMarkdown }: MarkdownToolbarProps) => {
  const markdownActions = [
    { icon: <Bold className="h-4 w-4" />, action: () => onInsertMarkdown('**', '**'), tooltip: 'Bold' },
    { icon: <Italic className="h-4 w-4" />, action: () => onInsertMarkdown('*', '*'), tooltip: 'Italic' },
    { icon: <Heading1 className="h-4 w-4" />, action: () => onInsertMarkdown('# ', ''), tooltip: 'Heading 1' },
    { icon: <Heading2 className="h-4 w-4" />, action: () => onInsertMarkdown('## ', ''), tooltip: 'Heading 2' },
    { icon: <List className="h-4 w-4" />, action: () => onInsertMarkdown('- ', ''), tooltip: 'Bulleted List' },
    { icon: <ListOrdered className="h-4 w-4" />, action: () => onInsertMarkdown('1. ', ''), tooltip: 'Numbered List' },
    { icon: <LinkIcon className="h-4 w-4" />, action: () => onInsertMarkdown('[', '](url)'), tooltip: 'Link' },
  ];

  return (
    <div className="flex items-center space-x-1 bg-gray-50 border-b p-2 overflow-x-auto">
      {markdownActions.map((action, index) => (
        <Button
          key={index}
          type="button"
          variant="ghost"
          size="sm"
          onClick={action.action}
          title={action.tooltip}
        >
          {action.icon}
        </Button>
      ))}
    </div>
  );
};

export default MarkdownToolbar;