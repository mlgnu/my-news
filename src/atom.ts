import { atom } from "jotai";
import { EverythingOptions } from "./types/newsapi";
import { Item } from "./components/Badges";
import { DateRange } from "react-day-picker";

export const searchAtom = atom<EverythingOptions | null>(null);
export const triggerSearchAtom = atom<boolean>(false);
export const requiredWordsAtom = atom<string[]>([]);
export const excludedWordsAtom = atom<string[]>([]);
export const languageAtom = atom<Item[]>([]);
export const dateAtom = atom<DateRange | undefined>(undefined);
