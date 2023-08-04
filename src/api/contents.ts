import { curry, map, pipe, range, toArray } from "@fxts/core";
import type { MinContent } from "../types/api";
import { randomUUID } from "crypto";


const mappingMinContent = curry((i: number) => ({ id: randomUUID(), title: `TITLE - ${i}`, summary: "summary" }));
const genContens = (l = 10) => pipe(range(l), map(mappingMinContent), toArray) as MinContent[];
export const test = () => Promise.resolve(genContens(10));