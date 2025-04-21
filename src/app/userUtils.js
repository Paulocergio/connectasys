import { Coffee, Edit2, Shield, UserCheck } from "lucide-react";

/**
 * Get initials from full name.
 */
export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Generate a gradient class based on the user's name.
 */
export function getAvatarGradient(name) {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-purple-500 to-indigo-600",
    "from-blue-500 to-teal-500",
    "from-green-500 to-emerald-600",
    "from-yellow-500 to-orange-600",
    "from-pink-500 to-rose-600",
    "from-indigo-500 to-blue-600",
    "from-red-500 to-pink-600",
    "from-teal-500 to-cyan-600",
    "from-orange-500 to-amber-600",
    "from-cyan-500 to-blue-600",
  ];
  return `bg-gradient-to-br ${gradients[hash % gradients.length]}`;
}

/**
 * Get badge color class based on the user's role.
 */
export function getRoleColor(role) {
  const r = role.toLowerCase();
  if (r.includes("developer") || r.includes("engineer")) return "bg-indigo-100 text-indigo-800";
  if (r.includes("ux") || r.includes("designer")) return "bg-pink-100 text-pink-800";
  if (r.includes("product") || r.includes("lead") || r.includes("scrum")) return "bg-amber-100 text-amber-800";
  if (r.includes("qa") || r.includes("test")) return "bg-purple-100 text-purple-800";
  if (r.includes("data") || r.includes("analyst")) return "bg-blue-100 text-blue-800";
  return "bg-emerald-100 text-emerald-800";
}

/**
 * Get an icon based on the user's role.
 */
export function getRoleIcon(role) {
  const r = role.toLowerCase();
  if (r.includes("developer") || r.includes("engineer")) return <Coffee className="h-4 w-4 mr-1" />;
  if (r.includes("ux") || r.includes("designer")) return <Edit2 className="h-4 w-4 mr-1" />;
  if (r.includes("product") || r.includes("lead") || r.includes("scrum")) return <Shield className="h-4 w-4 mr-1" />;
  return <UserCheck className="h-4 w-4 mr-1" />;
}