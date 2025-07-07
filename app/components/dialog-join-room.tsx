import { Link } from "react-router";

import { useRootLoaderData } from "@app/hooks/use-root-loader";

import { DialogBasic } from "@app/components/dialog-basic";

export function DialogJoinRoom() {
  const { isLoggedIn } = useRootLoaderData();

  return (
    <DialogBasic
      id="sign-in"
      open={!isLoggedIn}
      emoji="💿"
      heading="VRE"
      subheading="Virtual Record Exchange"
    >
      <Link to="/api/auth/sign-in" className="btn btn-primary">
        Sign in w/ Spotify
      </Link>
    </DialogBasic>
  );
}
