import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist: Playlist;
};

export function DialogReopenVoting({ playlist }: Props) {
  return (
    <DialogConfirm
      id="reopen-voting"
      emoji="🤔"
      heading="Are you sure?"
      subheading="Submissions will be re-enabled."
    >
      <Form action="/api/form/open" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, reopen voting</button>
      </Form>
    </DialogConfirm>
  );
}
