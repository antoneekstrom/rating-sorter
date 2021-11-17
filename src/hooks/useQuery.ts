import { useState } from "react";

/**
 *
 */
export type Query<T> = {
    resolve: (arg: T) => void;
    reject: (err: string) => void;
};

/**
 *
 */
export function useQuery<T>() {
    const [query, setQuery] = useState<Query<T>>();

    return { isDone: query == undefined, makeQuery, query };

    async function makeQuery() {
        const r = await new Promise<T>((resolve, reject) => {
            setQuery({ resolve, reject });
        });
        setQuery(undefined);
        return r;
    }
}
