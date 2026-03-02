import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist?: Playlist;
};

export function DialogDeleteForm({ playlist }: Props) {
  if (!playlist) return null;

  return (
    <DialogConfirm
      id="delete-form"
      emoji="🤔"
      heading="Are you sure?"
      subheading="This can't be undone!"
    >
      <Form action="/api/form/delete" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, delete this</button>
      </Form>
    </DialogConfirm>
  );
}
