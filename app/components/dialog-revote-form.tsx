import { Form, Link } from "react-router";

import type { VoteSchema } from "@server/schema";

import { DialogBasic } from "@app/components/dialog-basic";

type Props = {
  playlist: Playlist;
  vote?: VoteSchema;
};

export function DialogRevoteForm({ vote, playlist }: Props) {
  if (!vote) return;

  return (
    <DialogBasic
      open={!!vote}
      emoji="🤔"
      heading="You've already voted!"
      subheading="You can always resubmit though. Click below to clear your previous vote."
    >
      <Form action="/api/vote/delete" method="post">
        <input type="hidden" name="vote-id" value={vote.id} />
        <input type="hidden" name="playlist-id" value={playlist.id} />
        <button className="btn btn-primary">Revote</button>
      </Form>
      <Link to="/" className="btn btn-secondary">
        Nevermind
      </Link>
    </DialogBasic>
  );
}
