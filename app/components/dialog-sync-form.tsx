import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist: Playlist;
  className?: string;
};

export function DialogSyncForm({ playlist, className }: Props) {
  return (
    <DialogConfirm
      id="sync-form"
      label="Sync Form"
      emoji="🔄"
      heading="Are you sure?"
      subheading="Any contributors added after this form was created will be added."
      className={className}
    >
      <Form action="/api/form/sync" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, sync form</button>
      </Form>
    </DialogConfirm>
  );
}
