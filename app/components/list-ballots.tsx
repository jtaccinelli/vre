import { ListEmpty } from "./list-empty";

type Props = {
  ballots: string[];
};

export function ListBallots({ ballots }: Props) {
  if (ballots.length === 0) {
    return <ListEmpty message="You have no relevant ballots!" />;
  }

  return <div></div>;
}
