import {
  CircleDollarSignIcon,
  CoinsIcon,
  Share2Icon,
  TrendingUpIcon,
  UsersIcon,
  WalletCardsIcon,
} from "lucide-react";

const AmountCard = ({ item }) => {
  // Helper functions for card styling
  function getCardStyle(title) {
    if (title.includes("সদস্য"))
      return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-900 border border-blue-200 dark:border-blue-800 shadow-md";
    if (title.includes("শেয়ার"))
      return "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-900 border border-purple-200 dark:border-purple-800 shadow-md";
    if (title.includes("ইনভেস্ট"))
      return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-900 border border-amber-200 dark:border-amber-800 shadow-md";
    if (title.includes("মুনাফা"))
      return "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-900 border border-green-200 dark:border-green-800 shadow-md";
    if (title.includes("খরচ"))
      return "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/50 dark:to-red-900 border border-red-200 dark:border-red-800 shadow-md";
    return "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md";
  }

  function getCardIcon(title) {
    if (title.includes("সদস্য"))
      return <UsersIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />;
    if (title.includes("শেয়ার"))
      return (
        <Share2Icon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
      );
    if (title.includes("ইনভেস্ট"))
      return (
        <TrendingUpIcon className="w-6 h-6 text-amber-500 dark:text-amber-400" />
      );
    if (title.includes("মুনাফা"))
      return (
        <CoinsIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
      );
    if (title.includes("খরচ"))
      return (
        <WalletCardsIcon className="w-6 h-6 text-red-500 dark:text-red-400" />
      );
    return (
      <CircleDollarSignIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
    );
  }

  function renderCardDecorations(title, highlight) {
    if (highlight)
      return (
        <>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-600/10 dark:bg-gray-300/20"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-emerald-600/5 dark:bg-gray-300/10"></div>
        </>
      );

    if (title.includes("সদস্য"))
      return (
        <div className="absolute -right-4 -top-4 opacity-20 dark:opacity-10">
          <UsersIcon className="w-24 h-24 text-blue-400" />
        </div>
      );

    if (title.includes("শেয়ার"))
      return (
        <div className="absolute -right-4 -top-4 opacity-20 dark:opacity-10">
          <Share2Icon className="w-24 h-24 text-purple-400" />
        </div>
      );

    // Add similar decorations for other card types
  }

  function getGlowStyle(title) {
    if (title.includes("সদস্য"))
      return "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]";
    if (title.includes("শেয়ার"))
      return "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]";
    if (title.includes("ইনভেস্ট"))
      return "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]";
    if (title.includes("মুনাফা"))
      return "group-hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]";
    if (title.includes("খরচ"))
      return "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]";
    return "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]";
  }

  function getValueColor(title) {
    if (title.includes("সদস্য")) return "text-blue-600 dark:text-blue-400";
    if (title.includes("শেয়ার")) return "text-purple-600 dark:text-purple-400";
    if (title.includes("ইনভেস্ট")) return "text-amber-600 dark:text-amber-400";
    if (title.includes("মুনাফা")) return "text-green-600 dark:text-green-400";
    if (title.includes("খরচ")) return "text-red-600 dark:text-red-400";
    return "text-gray-900 dark:text-white";
  }

  function getTitleColor(title) {
    if (title.includes("সদস্য")) return "text-blue-500 dark:text-blue-300";
    if (title.includes("শেয়ার")) return "text-purple-500 dark:text-purple-300";
    if (title.includes("ইনভেস্ট")) return "text-amber-500 dark:text-amber-300";
    if (title.includes("মুনাফা")) return "text-green-500 dark:text-green-300";
    if (title.includes("খরচ")) return "text-red-500 dark:text-red-300";
    return "text-gray-600 dark:text-gray-400";
  }

  return (
    <div
      className={`p-6 rounded-2xl transition-all duration-500 relative overflow-hidden group isolate ${
        item.highlight
          ? "bg-gradient-to-br from-emerald-700 to-emerald-900 dark:from-gray-50 dark:to-white shadow-2xl"
          : getCardStyle(item.title)
      }`}
    >
      {/* Decorative elements based on card type */}
      {renderCardDecorations(item.title, item.highlight)}

      {/* Glowing border effect */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${
          item.highlight
            ? "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            : getGlowStyle(item.title)
        }`}
      ></div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col">
        <h3
          className={`text-4xl font-bold ${
            item.highlight
              ? "text-white dark:text-gray-900"
              : getValueColor(item.title)
          } ${
            item.value.includes("-") || item.value.startsWith("০.")
              ? "text-red-500 dark:text-red-400"
              : ""
          } transform transition-transform duration-300 group-hover:translate-y-[-2px]`}
        >
          {item.value}
        </h3>

        <h4
          className={`mt-3 text-lg font-medium ${
            item.highlight
              ? "text-emerald-100 dark:text-gray-600"
              : getTitleColor(item.title)
          }`}
        >
          {item.title}
        </h4>

        {/* Card footer icon */}
        {!item.highlight && (
          <div className="mt-auto pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
            {getCardIcon(item.title)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmountCard;
