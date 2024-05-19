export default function Index() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-4">
      <p>Enter A Playlist URL</p>
      <input
        className="w-full bg-gray-900 px-4 py-2"
        type="url"
        name="playlist"
        id="playlist"
        required
      />
      <button className="btn btn-primary">Get Voting</button>
    </div>
  );
}
