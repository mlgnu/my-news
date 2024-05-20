import { Field, Input, Label } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Badges, Item } from "./Badges";
import { useAtom } from "jotai";
import { excludedWordsAtom, requiredWordsAtom, searchAtom } from "../atom";

type BadgesInputProps = {
  label: string;
};

export const BadgesInput = ({ label }: BadgesInputProps) => {
  const atom =
    label === "Required Words" ? requiredWordsAtom : excludedWordsAtom;
  const field = label === "Required Words" ? "qPlus" : "qMinus";
  const [list, setList] = useAtom(atom);
  const operation = field === "qPlus" ? "+" : "-";
  const [, setSearchParams] = useAtom(searchAtom);

  useEffect(() => {
    const addInputSearch = (list: string[]) => {
      setSearchParams((prev) => ({
        ...prev,
        [field]: list.map((item) => `${operation}${item}`).join(" "),
      }));
    };
    addInputSearch(list);
  }, [list, label, field, setSearchParams, operation]);

  return (
    <div className="mb-3">
      <Field className="mb-2">
        <Label className="block text-sm font-medium leading-5 text-gray-900">
          {label}
        </Label>
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value !== "") {
              setList([...list, e.currentTarget.value]);
              e.currentTarget.value = "";
            }
          }}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-6 sm:text-sm sm:leading-6"
          name="full"
          type="text"
        />
      </Field>
      <Badges
        list={list}
        setList={setList as Dispatch<SetStateAction<Item[]>>}
      />
    </div>
  );
};
