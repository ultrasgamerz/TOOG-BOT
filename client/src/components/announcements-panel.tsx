import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Bell } from "lucide-react";

interface AnnouncementsPanelProps {
  serverId: string;
}

export function AnnouncementsPanel({ serverId }: AnnouncementsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [joinMessageEnabled, setJoinMessageEnabled] = useState(false);
  const [leaveMessageEnabled, setLeaveMessageEnabled] = useState(false);

  const handleJoinToggle = (checked: boolean) => {
    setJoinMessageEnabled(checked);
    // Here you would typically make an API call to update the server settings
    console.log("Join message toggled:", checked);
  };

  const handleLeaveToggle = (checked: boolean) => {
    setLeaveMessageEnabled(checked);
    // Here you would typically make an API call to update the server settings
    console.log("Leave message toggled:", checked);
  };

  return (
    <div 
      className="w-full cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="w-full justify-start py-10 px-6 hover:bg-[#404249] text-left bg-[#2B2D31] rounded-md h-auto">
        <div className="flex items-start gap-6">
          <Bell className="h-6 w-6 text-zinc-400 shrink-0 mt-1" />
          <div className="flex-grow">
            <div className="flex items-center gap-4">
              <div className="font-medium text-white">Announcements</div>
              <span className="text-[11px] font-semibold bg-blue-600 text-white px-2 py-1 rounded">
                BETA
              </span>
            </div>
            <div className="text-sm text-zinc-400 mt-1">
              Configure join and leave messages
            </div>
          </div>
          <ChevronRight 
            className={`h-6 w-6 text-zinc-400 transform transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-8 space-y-8 mt-3 bg-[#2B2D31] rounded-md">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white text-lg font-medium">Join Message</h4>
                <p className="text-base text-zinc-400 mt-2">Send a message when a user joins the server</p>
              </div>
              <Switch 
                checked={joinMessageEnabled}
                onCheckedChange={handleJoinToggle}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white text-lg font-medium">Leave Message</h4>
                <p className="text-base text-zinc-400 mt-2">Send a message when a user leaves the server</p>
              </div>
              <Switch 
                checked={leaveMessageEnabled}
                onCheckedChange={handleLeaveToggle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}