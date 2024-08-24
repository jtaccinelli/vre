type Props = {
  ballots: string[];
};

export function ListBallots({ ballots }: Props) {
  if (ballots.length === 0) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center rounded border-2 border-dashed border-gray-800">
        <p className="text-gray-600">You have no relevant ballots!</p>
      </div>
    );
  }
  return <div></div>;
}
