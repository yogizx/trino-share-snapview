
import { Card, CardContent } from "@/components/ui/card";

interface ProcessingIndicatorProps {
  message: string;
  className?: string;
}

const ProcessingIndicator = ({ message, className }: ProcessingIndicatorProps) => {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="space-y-4 text-center">
          <div className="relative h-16 w-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-t-4 border-brand-teal border-opacity-50 animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-white flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-brand-teal"></div>
            </div>
          </div>
          <p className="text-lg font-medium">{message}</p>
          <p className="text-sm text-gray-500">Please wait while we process your request</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingIndicator;
