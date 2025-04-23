import { getEngToBnNumber } from "@/utils/getEngToBn";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-100 dark:bg-[#0f172a] text-gray-600 dark:text-gray-400 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center gap-2">
        <p className="text-sm">
          &copy; {getEngToBnNumber(new Date().getFullYear())} | সর্বস্বত্ব
          সংরক্ষিত
        </p>

        <div className="flex items-center gap-1 text-sm">
          <span>ডেভলপ ও মেইনটেইন: </span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Rashed4Abdullah"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-4 transition duration-300"
          >
            রাশেদ আব্দুল্লাহ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
