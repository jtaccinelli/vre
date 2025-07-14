import { useBoolean } from "@app/hooks/use-boolean";

import { Dialog } from "@app/components/dialog";
import { FormSignIn } from "@app/components/form-sign-in";

type Props = {
  className?: string;
};

export function DialogSignIn({ className }: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);

  return (
    <>
      <button onClick={setIsOpen.true} className={className} tabIndex={0}>
        Sign In
      </button>
      <Dialog
        id="sign-in"
        open={isOpen}
        onClose={setIsOpen.false}
        heading="Sign In"
        className="text-left"
      >
        <FormSignIn />
      </Dialog>
    </>
  );
}
