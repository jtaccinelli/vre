type Props = {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
};

export function FieldText({ name, label, description, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-4 px-6 py-8">
      <label className="label -mb-4 block" htmlFor={name}>
        {label}
      </label>
      <div className="flex justify-between">
        <p className="text text-gray-400">{description}</p>
      </div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className="field-input rounded border-transparent bg-gray-700 text-white placeholder:text-gray-500"
      />
    </div>
  );
}
