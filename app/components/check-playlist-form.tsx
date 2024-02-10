import { useState, ChangeEventHandler } from "react";
import { Form, useNavigate } from "@remix-run/react";

export function CheckPlaylistForm() {
  const [playlistId, setPlaylistId] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const url = new URL(event.target.value);
    const id = url.pathname.split("/").pop();
    if (id) setPlaylistId(id);
  };

  return (
    <Form action={`/playlist/${playlistId}`}>
      <input type="url" name="url" onChange={handleChange} />
      <button type="submit" disabled={!playlistId}>
        Check Playlist
      </button>
    </Form>
  );
}
