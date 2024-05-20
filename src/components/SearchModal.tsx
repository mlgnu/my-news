import { Fragment, useRef, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IconAdjustments } from "@tabler/icons-react";
import { BadgesInput } from "./BadgesInput";
import { MultiSelect } from "./MultiSelect";
import { languages } from "../utils/search";
import { DateRangePicker } from "./DateRangePicker";
import { useAtom } from "jotai";
import { triggerSearchAtom } from "../atom";

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const [, setTriggerSearch] = useAtom(triggerSearchAtom);
  const cancelButtonRef = useRef(null);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="absolute cursor-pointer inset-y-0 start-0 flex items-center ps-3"
      >
        <IconAdjustments
          className="hover:text-primary-7 transition-colors duration-200 ease-in-out"
          stroke={1}
        />
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          unmount={false}
          className="relative overflow-visible z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative w-full transform rounded-lg bg-white shadow-xl transition-all sm:my-8 max-w-xl">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="mt-0">
                      <BadgesInput label="Required Words" />
                      <BadgesInput label="Excluded Words" />
                      <MultiSelect title="Language" list={languages} />
                      <DateRangePicker title="Search Date Range" />
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-primary-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-8 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        setTriggerSearch(true);
                      }}
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
