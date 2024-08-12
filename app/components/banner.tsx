type Props = {
  content: string;
};

export function Banner({ content }: Props) {
  return <div className="rounded bg-black p-4">{content}</div>;
}
