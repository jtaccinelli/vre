type Props = {
  message: string;
};

export function ListEmpty({ message }: Props) {
  return (
    <div className="flex flex-grow flex-col items-center justify-center rounded border-2 border-dashed border-gray-800">
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
