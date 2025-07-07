import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist: Playlist;
  className?: string;
};

export function DialogDeleteForm({ playlist, className }: Props) {
  return (
    <DialogConfirm
      id="delete-form"
      label="Delete Form"
      emoji="🤔"
      heading="Are you sure?"
      subheading="This can't be undone!"
      className={className}
    >
      <Form action="/api/form/delete" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, delete this</button>
      </Form>
    </DialogConfirm>
  );
}
