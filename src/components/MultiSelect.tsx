import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { IconAdjustments, IconCheck } from "@tabler/icons-react";
import { Badges, Item } from "./Badges";
import { languageAtom, searchAtom } from "../atom";
import { useAtom } from "jotai";

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

type MultiSelectProps = {
  title: string;
  list: Item[];
};

export const MultiSelect = ({ title, list }: MultiSelectProps) => {
  const [query, setQuery] = useState("");
  const [, setSearchParams] = useAtom(searchAtom);
  const field = title === "Source" ? "sources" : "language";
  const [selecteditem, setSelecteditem] = useAtom(languageAtom);

  const filteredlist =
    query === ""
      ? list
      : list.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: selecteditem.map((item) => item.id).toString(),
    }));
  }, [selecteditem, field, setSearchParams]);

  return (
    <>
      <Combobox
        className="mb-2 w-full"
        as="div"
        onChange={(item: Item) => {
          if (selecteditem.includes(item) || !item) {
            return;
          }
          setSelecteditem([...(selecteditem as Item[]), item]);
        }}
      >
        <Label className="block text-sm font-medium leading-5 text-gray-900">
          {title}
        </Label>
        <div className="relative mt-1">
          <ComboboxInput
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-6 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item) => item?.name}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <IconAdjustments
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>

          {filteredlist.length > 0 && (
            <ComboboxOptions
              // @ts-expect-error This is an error in the @headlessui/react package as their type doesn't include the `tabIndex` prop but it works fine
              tabIndex="1"
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {filteredlist.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold",
                        )}
                      >
                        {item.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600",
                          )}
                        >
                          <IconCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      <Badges list={selecteditem} setList={setSelecteditem} />
    </>
  );
};
