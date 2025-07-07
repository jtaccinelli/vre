import { Form } from "react-router";

import { DialogConfirm } from "@app/components/dialog-confirm";

type Props = {
  playlist: Playlist;
  className?: string;
};

export function DialogCloseVoting({ playlist, className }: Props) {
  return (
    <DialogConfirm
      id="close-voting"
      label="Close Voting"
      emoji="🤔"
      heading="Are you sure?"
      subheading="Submissions will be stopped."
      className={className}
    >
      <Form action="/api/form/close" method="post">
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Yes, close voting</button>
      </Form>
    </DialogConfirm>
  );
}
