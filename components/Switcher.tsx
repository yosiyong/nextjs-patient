import "../app/globals.css";
import Link from "next/link";

const Switcher = () => {
  return (
    <div className="space-x-3">
      <Link
        href="/en"
        className="bg-blue-500 text-white font-semibold rounded-md p-3"
      >
        EN
      </Link>
      <Link
        href="/ja"
        className="bg-blue-500 text-white font-semibold rounded-md p-3"
      >
        JP
      </Link>
    </div>
  );
};

export default Switcher;