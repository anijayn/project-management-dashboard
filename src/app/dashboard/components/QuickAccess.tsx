import { Button } from "@/components/ui/button";
import { FaHome, FaQuestion } from "react-icons/fa";

export default function QuickAccess() {
  return (
    <div className="flex justify-between border">
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <FaHome className="text-blue-400 text-bold" />
      </Button>
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <FaQuestion className="text-blue-400 text-bold" />
      </Button>
    </div>
  );
}
