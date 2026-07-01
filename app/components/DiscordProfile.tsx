"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: {
    name: string;
    state?: string;
    details?: string;
  }[];
}

const STATUS_COLORS = {
  online: "#23a559",
  idle: "#f1c40f",
  dnd: "#f04747",
  offline: "#80848e",
};

export default function DiscordProfile({ id = "1497601892337844305" }: { id?: string }) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    // Fetch live Discord data via Lanyard API
    const fetchLanyard = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch Discord profile", err);
      }
    };
    
    fetchLanyard();
    // Poll every 10 seconds for live updates
    const interval = setInterval(fetchLanyard, 10000);
    return () => clearInterval(interval);
  }, [id]);

  // Fallback visual data if still loading or not in Lanyard
  const avatarUrl = data?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${id}/${data.discord_user.avatar}.png?size=256`
    : `https://api.dicebear.com/7.x/notionists/svg?seed=${id}&backgroundColor=b6e3f4`;
    
  const displayName = data?.discord_user.global_name || data?.discord_user.username || "Loading...";
  const username = data?.discord_user.username || "fetching profile...";
  const statusColor = data ? STATUS_COLORS[data.discord_status] : STATUS_COLORS.offline;
  
  // Get main activity (e.g., Playing VS Code, Listening to Spotify)
  const activity = data?.activities?.filter(a => a.name !== "Custom Status")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="w-full max-w-sm mx-auto rounded-[16px] overflow-hidden bg-[#111214] border border-white/[0.08] shadow-2xl relative"
    >
      {/* Banner */}
      <div className="h-[120px] w-full relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111214] to-transparent" />
      </div>

      {/* Avatar & Badges */}
      <div className="px-4 relative flex justify-between items-end -mt-12 mb-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-[92px] h-[92px] rounded-full border-[6px] border-[#111214] bg-[#1e1f22] overflow-hidden relative">
            <Image 
              src={avatarUrl}
              alt="Avatar"
              fill
              unoptimized
              className="object-cover"
              sizes="92px"
            />
          </div>
          {/* Status Indicator */}
          <div className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-[#111214] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: statusColor }} />
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-1.5 bg-[#1e1f22] p-1.5 rounded-lg border border-white/5 mb-2">
          {/* Hypesquad Bravery badge mockup */}
          <div className="w-5 h-5 bg-[#9b84ee] rounded-sm flex items-center justify-center text-[10px]" title="HypeSquad Bravery">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V13C2 18.52 6.27 23.6 12 25C17.73 23.6 22 18.52 22 13V7L12 2ZM12 11.5L6.5 14L8 8.5L4 4.5L9.5 4L12 2L14.5 4L20 4.5L16 8.5L17.5 14L12 11.5Z" fill="white"/>
            </svg>
          </div>
          {/* Active Developer badge mockup */}
          <div className="w-5 h-5 bg-[#23a559] rounded-sm flex items-center justify-center text-[10px]" title="Active Developer">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V21L21 13L8 5Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 pb-4">
        <div className="mb-3 p-3 bg-[#1e1f22]/50 rounded-xl border border-white/5 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-[#f2f3f5] leading-tight">{displayName}</h2>
          <p className="text-sm text-[#dbdee1]">{username}</p>
          
          {/* Custom Status */}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
            <span>🚀</span>
            <span className="text-sm text-[#dbdee1]">Building awesome things</span>
          </div>

          {/* Live Activity (if any) */}
          {activity && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[10px] font-bold text-[#b5bac1] uppercase tracking-wide mb-1">
                Playing {activity.name}
              </p>
              <p className="text-sm text-[#dbdee1] truncate">{activity.details}</p>
              <p className="text-xs text-[#80848e] truncate">{activity.state}</p>
            </div>
          )}
        </div>

        {/* About Me */}
        <div className="mb-3">
          <h3 className="text-xs font-bold text-[#b5bac1] uppercase tracking-wide mb-1.5">About Me</h3>
          <p className="text-sm text-[#dbdee1] leading-relaxed">
            Full-stack developer from Indonesia. Passionate about web development, open-source, and astronomy. Let&apos;s build something great together!
          </p>
        </div>

        {/* Roles */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-[#b5bac1] uppercase tracking-wide mb-1.5">Roles</h3>
          <div className="flex flex-wrap gap-1.5">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1e1f22] rounded border border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#f1c40f]" />
              <span className="text-xs text-[#dbdee1]">Developer</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1e1f22] rounded border border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#3498db]" />
              <span className="text-xs text-[#dbdee1]">Designer</span>
            </div>
          </div>
        </div>


      </div>
    </motion.div>
  );
}
