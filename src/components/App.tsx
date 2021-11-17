import React, { useEffect, useState } from 'react';
import quickSort from '../quickSort';
import { useQuery } from '../hooks';
import MainView from "./MainView";
import Compare from "./Compare";

export type ListState = [items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>]

export type Stats = {
    sortTime: number;
}

export default function App() {
    const [items, setItems] = useState<string[]>([]);
    const [options, setOptions] = useState<{ a: string; b: string; }>();
    const { isDone, makeQuery, query } = useQuery<string>();
    const [stats, setStats] = useState<Stats>(undefined);

    useEffect(() => {
        const url = new URL(window.location.href);
        const list = url.searchParams.get('list');
        if (list) {
            setItems(list.split(','));
            url.searchParams.delete('list');
            window.history.replaceState(undefined, 'AAAHHH', url.href);
        }
    }, [])

    if (!isDone) {
        return <Compare {...{ options, query }} />;
    }
    else {
        return <MainView listState={[items, setItems]} sort={startSorting} />;
    }

    async function startSorting() {
        const r = await quickSort([...items], compare);
        setItems(r);

        async function compare(a: string, b: string) {
            setOptions({ a, b });
            const result = await makeQuery();
            console.log(a, b, result === a);
            return result === a;
        }
    }
}
