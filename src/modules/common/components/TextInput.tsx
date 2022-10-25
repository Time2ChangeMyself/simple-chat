import { ChangeEvent, KeyboardEvent, useId } from 'react';
import { ImageIcon } from '../../../assets';

interface ITextInput {
  label?: string;
  onChange: (e: ChangeEvent) => void;
  value?: string;
  placeholder?: string;
  name: string;
  type?: string;
  filename?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export const TextInput: React.FC<ITextInput> = ({
  label,
  onChange,
  value = '',
  placeholder,
  name,
  type = 'text',
  filename = null,
  onKeyDown,
}) => {
  const id = useId();
  const isHidden = type === 'file';

  return (
    <div className="relative w-full">
      <label
        className="bottom-100 flex gap-4 items-center text-red-500 font-bold cursor-pointer"
        htmlFor={id}
      >
        {isHidden && (
          <>
            <img className="max-h-10" src={ImageIcon} alt="" />
            {filename !== null && <p>{filename}</p>}
          </>
        )}
        {label}
      </label>
      <input
        onKeyDown={onKeyDown}
        hidden={isHidden}
        name={name}
        className="w-full h-10 outline-none border-solid border-2 border-cyan-600 p-2 focus-visible:shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        type={type}
      />
    </div>
  );
};
