import { Dialog } from "@app/components/dialog";
import { FormSignIn } from "@app/components/form-sign-in";

export function DialogSignIn() {
  return (
    <Dialog id="sign-in" heading="Sign In" className="text-left">
      <FormSignIn />
    </Dialog>
  );
}
