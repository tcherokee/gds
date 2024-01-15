import type { CasinoData } from "./common/types";

export type CasinoListBlock = {
    id: number;
    casino: {
        data: CasinoData[];
    };
};