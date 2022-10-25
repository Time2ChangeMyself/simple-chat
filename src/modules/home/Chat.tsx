import { TextInput } from '../common/components';

export const Chat = () => {
  return (
    <div className="col-[3/-1] bg-indigo-400 flex flex-col text-red-400 max-h-full relative overflow-hidden">
      <div className="h-20 bg-slate-600 w-full flex-shrink-0"></div>
      <div className="max-h-full flex flex-col p-5 gap-5 overflow-y-scroll overflow-x-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <p
            key={i}
            className="text-black max-w-4/5 w-fit p-2 bg-white rounded-lg text-ellipsis"
          >
            Messagez
          </p>
        ))}
      </div>
      <TextInput value="123" onChange={() => {}} name="message" />
      <div className="absolute bottom-0"></div>
    </div>
  );
};
