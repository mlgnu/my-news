import { useRef, useState } from "react";
import { SearchModal } from "./SearchModal";
import { requiredWordsAtom, searchAtom } from "../atom";
import { useAtom } from "jotai";
import { triggerSearchAtom } from "../atom";

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [, setSearchParams] = useAtom(searchAtom);
  const [, setTriggerSearch] = useAtom(triggerSearchAtom);
  const [requiredWords] = useAtom(requiredWordsAtom);

  return (
    <header className="border border-b-gray-200 bg-white sticky top-0 z-10 mb-8">
      <section className="max-w-4xl mx-auto p-3 md:flex">
        <div className="flex peer justify-center items-center">
          <h1 className="text-2xl font-extrabold text-primary-8">My News</h1>

          <button
            onClick={() => {
              setNavOpen((prev) => !prev);
            }}
            className="text-primary-8 lg:hidden text-3xl ml-auto"
          >
            {navOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
          </button>
        </div>

        <div
          className={`md:flex ease-in-out flex m-auto md:mr-0 xl:justify-end items-center max-w-sm md:ml-auto ${
            navOpen
              ? "flex transition-all duration-500 opacity-100 h-auto"
              : "h-0 opacity-0 md:opacity-100"
          }`}
        >
          <div className="relative w-full">
            <SearchModal />
            <input
              ref={inputRef}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search for news"
              required
            />
          </div>
          <button
            onClick={() => {
              setSearchParams((prev) => ({
                ...prev,
                q:
                  inputRef.current?.value +
                  requiredWords.map((word) => `+${word}`).join(" "),
              }));
              setTriggerSearch(true);
            }}
            className="p-2.5 ms-2 bg-primary-6 text-sm font-medium text-white rounded-lg hover:bg-primary-9 focus:ring-4 focus:outline-none focus:ring-primary-6 focus:ring-opacity-50"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </section>
    </header>
  );
};
