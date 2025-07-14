import { useState } from "react";

import { generateRoomId } from "@app/lib/helpers";

export function FieldRoomGenerateInput() {
  const [value, setValue] = useState<string>(generateRoomId());

  const handleGenerate = () => {
    setValue(generateRoomId());
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <input type="hidden" name="room-id" value={value} />
      <label className="label -mb-4 block">Create a Room ID</label>
      <div className="flex justify-between">
        <p className="text text-gray-400">
          A six digit code, to give to your contributors
        </p>
        <button
          type="button"
          onClick={handleGenerate}
          className="link disabled:hidden"
          disabled={!value}
        >
          Regenerate
        </button>
      </div>
      <input
        type="text"
        placeholder="vR3RoX"
        value={value}
        className="field-input rounded border-transparent bg-gray-700 font-mono text-white placeholder:text-gray-500"
        disabled
      />
    </div>
  );
}
