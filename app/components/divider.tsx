type Props = {
  content?: string;
};

export function Divider({ content }: Props) {
  return (
    <div className="flex items-center gap-4">
      <hr className="flex-grow border-gray-700" />
      {!content ? null : (
        <>
          <p className="text-sm text-gray-700">OR</p>
          <hr className="flex-grow border-gray-700" />
        </>
      )}
    </div>
  );
}
