import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router";

import { type ResultValue, TIEBREAK_VOTER } from "@app/lib/results";

import { useBoolean } from "@app/hooks/use-boolean";
import { usePlaylist } from "@app/hooks/use-playlist";

import { Dialog } from "@app/components/dialog";
import { Placeholder } from "@app/components/placeholder";

type Props = {
  cta: string;
  field: string;
  disabled?: boolean;
  items: ResultValue[];
  className?: string;
};

export function DialogTiebreak({
  cta,
  disabled,
  items,
  className,
  field,
}: Props) {
  const [isOpen, setIsOpen] = useBoolean(false);
  const [selectedId, setSelectedId] = useState("");
  const playlist = usePlaylist();

  const navigation = useNavigation();

  useEffect(() => {
    if (disabled) setIsOpen.false();
  }, [disabled]);

  useEffect(() => {
    if (navigation.state !== "idle") setIsOpen.false();
  }, [navigation]);

  const handleSetId = (item: ResultValue) => () => {
    setSelectedId(item.id);
  };

  return (
    <>
      <button
        type="button"
        onClick={setIsOpen.true}
        className={className}
        disabled={disabled}
      >
        {cta}
      </button>
      <Dialog open={isOpen} onClose={setIsOpen.false} className="flex flex-col">
        <div className="border-b border-gray-950 p-6">
          <p className="title">Tiebreak</p>
        </div>
        <div className="flex h-full flex-col gap-3 p-6 text-white">
          <p className="label text-gray-300">Please select a true winner</p>
          {!items.length ? (
            <Placeholder label="No data found" />
          ) : (
            items.map((item) => (
              <button
                onClick={handleSetId(item)}
                data-ui={item.id === selectedId && "selected"}
                className="ui-selected:bg-white ui-selected:text-black flex justify-between rounded bg-gray-800 p-3 text-left transition-all hover:cursor-pointer hover:bg-gray-700"
              >
                {item.name}
              </button>
            ))
          )}
        </div>
        <div className="sticky bottom-0 border-t border-gray-950 bg-gray-900 px-6 py-4">
          <Form action="/api/vote/create" method="post">
            <input type="hidden" name="voter-id" value={TIEBREAK_VOTER} />
            <input type="hidden" name="playlist-id" value={playlist.id} />
            <input type="hidden" name={field} value={selectedId} />
            <button
              type="submit"
              className="btn btn-primary self-start"
              disabled={!selectedId}
            >
              Submit Tiebreaker
            </button>
          </Form>
        </div>
      </Dialog>
    </>
  );
}
