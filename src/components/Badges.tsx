import { IconX } from "@tabler/icons-react";

export type Item = string | { id: string; name: string };

type BadgesProps = {
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
};

type BadgeProps = {
  item: Item;
  remove: (index: number) => void;
  idx: number;
};

export const Badges: React.FC<BadgesProps> = ({ list, setList }) => {
  const remove = (index: number) => {
    setList(list.filter((_, idx) => idx !== index));
  };
  const badges = list.map((item, idx) => (
    <Badge
      key={typeof item === "string" ? item + idx : item.id}
      item={typeof item === "string" ? item : item.name}
      idx={idx}
      remove={remove}
    />
  ));
  return <div className="flex mb-1 flex-wrap gap-2 max-w-fit">{badges}</div>;
};

const Badge = ({ item, remove, idx }: BadgeProps) => {
  const content = typeof item === "string" ? item : item.name;
  return (
    <div className="inline-flex items-center hover:bg-primary-8 transition-colors duration-200 ease-in-out cursor-default justify-between bg-primary-6 text-white rounded-xl px-2">
      <div className="leading-7"> {content} </div>
      <IconX
        className="cursor-pointer ml-1.5"
        onClick={() => {
          remove(idx);
        }}
        stroke={2}
        size={15}
      />
    </div>
  );
};
