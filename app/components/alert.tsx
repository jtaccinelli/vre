import { Info } from "@phosphor-icons/react";
import { Link } from "react-router";

type Props = {
  message: string;
  cta: string;
  href: string;
};

export function Alert({ message, cta, href }: Props) {
  return (
    <div className="flex gap-3 rounded bg-white p-3 text-black md:items-center">
      <Info size={20} weight="fill" />
      <div className="flex grow flex-col gap-1 md:flex-row">
        <p className="text grow">{message}</p>
        <Link to={href} className="link">
          {cta}
        </Link>
      </div>
    </div>
  );
}
