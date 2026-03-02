import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist?: Playlist;
};

export function DialogCloseVoting({ playlist }: Props) {
  if (!playlist) return null;

  return (
    <DialogConfirm
      id="close-voting"
      emoji="🤔"
      heading="Are you sure?"
      subheading="Submissions will be stopped."
    >
      <Form action="/api/form/close" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, close voting</button>
      </Form>
    </DialogConfirm>
  );
}
