export function FieldCredentials() {
  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <label className="label -mb-4 block">What are your credentials?</label>
      <div className="flex justify-between">
        <p className="text text-gray-400">
          You can generate these via the Developer Dashboard
        </p>
      </div>
      <input
        type="text"
        name="spotify-client-id"
        placeholder="Spotify Client ID"
        className="field-input rounded border-transparent bg-gray-700 text-white placeholder:text-gray-500"
      />
      <input
        type="text"
        name="spotify-client-secret"
        placeholder="Spotify Client Secret"
        className="field-input rounded border-transparent bg-gray-700 text-white placeholder:text-gray-500"
      />
    </div>
  );
}
