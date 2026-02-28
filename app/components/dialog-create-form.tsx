import { Dialog } from "@app/components/dialog";
import { FormCreate } from "@app/components/form-create";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function DialogCreateForm({ isOpen, onClose }: Props) {
  return (
    <Dialog
      id="create-form"
      open={isOpen}
      onClose={onClose}
      heading="Create a Form"
      className="flex flex-col"
    >
      <FormCreate />
    </Dialog>
  );
}
