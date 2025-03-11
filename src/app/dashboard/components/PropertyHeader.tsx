import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyHeaderProps {
  onAddProperty: () => void;
}

export default function PropertyHeader({ onAddProperty }: PropertyHeaderProps) {
  return (
    <div className="flex space-x-2 p-2">
      <h1 className="text-xl mx-3">Property</h1>
      <Button
        onClick={onAddProperty}
        size="icon"
        variant="outline"
        className="h-7 w-7 rounded-full hover:bg-gray-100 border-blue-400 hover:border-blue-500 shadow-[0_0_10px_rgba(96,165,250,0.3)] hover:shadow-[0_0_15px_rgba(96,165,250,0.4)] cursor-pointer"
      >
        <Plus className="text-blue-400 text-bold" />
      </Button>
    </div>
  );
}
