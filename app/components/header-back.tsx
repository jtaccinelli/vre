import { CaretLeft } from "@phosphor-icons/react";
import { Link } from "react-router";

export function HeaderBack() {
  return (
    <div className="border-b border-gray-800 px-6 py-4">
      <Link to="/" className="flex items-center gap-2 text-gray-400">
        <CaretLeft size={20} />
        <span>Voting Forms</span>
      </Link>
    </div>
  );
}
