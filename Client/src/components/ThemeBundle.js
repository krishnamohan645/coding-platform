/**
 * This file is a "Theme Bundle" to ensure Tailwind CSS includes these dynamic classes
 * because they are retrieved from the database at runtime.
 */
export const dynamicThemeClasses = [
  // JavaScript Theme
  "bg-gradient-to-r from-yellow-400 to-yellow-600",
  "border-yellow-400 hover:border-yellow-500",
  "text-yellow-600 bg-yellow-50",
  
  // Python Theme
  "bg-gradient-to-r from-blue-400 to-blue-600",
  "border-blue-400 hover:border-blue-500",
  "text-blue-600 bg-blue-50",
  
  // Java Theme
  "bg-gradient-to-r from-red-400 to-red-600",
  "border-red-400 hover:border-red-500",
  "text-red-600 bg-red-50",
  
  // C++ Theme (Purple)
  "bg-gradient-to-r from-purple-400 to-purple-600",
  "border-purple-400 hover:border-purple-500",
  "text-purple-600 bg-purple-50",

  // Difficulty & Status Colors
  "bg-emerald-100 text-emerald-800",
  "bg-emerald-500",
  "text-emerald-600 bg-emerald-50",
  "bg-orange-100 text-orange-800",
  "bg-orange-500",
  "text-orange-600 bg-orange-50"
];

export default function ThemeBundle() {
  return null; // This component doesn't render anything
}
