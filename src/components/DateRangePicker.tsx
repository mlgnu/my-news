import { Fragment, useEffect, useRef, useState } from "react";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { Field, Input, Label, Transition } from "@headlessui/react";
import { format, formatISO } from "date-fns";
import { useAtom } from "jotai";
import { searchAtom } from "../atom";
import { dateAtom } from "../atom";

type DateRangePickerProps = {
  title: string;
};

export const DateRangePicker = ({ title }: DateRangePickerProps) => {
  const [range, setRange] = useAtom(dateAtom);
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useAtom(searchAtom);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <Field className="">
        <Label className="block text-sm font-medium leading-5 text-gray-900">
          {title}
        </Label>
        <Input
          value={
            range?.from && range?.to
              ? `${format(range.from, "MM/dd/yyyy")} - ${format(range.to, "MM/dd/yyyy")}`
              : ""
          }
          onClick={() => {
            setOpen(true);
          }}
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-6 sm:text-sm sm:leading-6"
          name="full"
          type="text"
        />
        <Transition
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={open}
          as={Fragment}
        >
          <div
            ref={modalRef}
            className="max-w-lg absolute  border bg-white rounded-md "
          >
            <DayPicker
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-primary-4 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-primary-6 text-white hover:bg-primary-9 hover:text-black focus:bg-primary-6 focus:text-white",
                day_today: "rounded-md text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <IconChevronLeft {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <IconChevronRight {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
              mode="range"
              selected={range}
              onSelect={(range) => {
                setRange(range);
                if (range?.from && range?.to) {
                  setSearchParams({
                    ...searchParams,
                    from: formatISO(range.from),
                    to: formatISO(range.to),
                  });
                  setOpen(false);
                }
              }}
            />
          </div>
        </Transition>
      </Field>
    </>
  );
};
