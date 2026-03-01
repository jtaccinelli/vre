import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist: Playlist;
};

export function DialogSyncForm({ playlist }: Props) {
  return (
    <DialogConfirm
      id="sync-form"
      emoji="🔄"
      heading="Are you sure?"
      subheading="Any contributors added after this form was created will be added."
    >
      <Form action="/api/form/sync" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button type="submit" className="btn btn-primary">
          Yes, sync form
        </button>
      </Form>
    </DialogConfirm>
  );
}
