import { Dialog } from "@app/components/dialog";
import { FormCreate } from "@app/components/form-create";

export function DialogCreateForm() {
  return (
    <Dialog id="create-form" heading="Create a Form" className="flex flex-col">
      <FormCreate />
    </Dialog>
  );
}
