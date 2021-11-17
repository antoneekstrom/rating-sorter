import { useState } from 'react';

/**
 * 
 */
export type Query<T> = {
    resolve: (arg: T) => void,
    reject: (err: string) => void
}

/**
 * 
 */
export function useQuery<T>() {
    const [query, setQuery] = useState<Query<T>>();

    return { isDone: query == undefined, makeQuery, query }

    async function makeQuery() {
        const r = await new Promise<T>((resolve, reject) => {
            setQuery({resolve, reject});
        });
        setQuery(undefined);
        return r;
    }
}

/**
 * 
 */
export type FileDropProps<T = HTMLElement> = {
    onDragOver?: (e: React.DragEvent<T>) => void
    onDrop?: (e: React.DragEvent<T>) => void
}

/**
 * 
 * @param onFiles 
 */
export function useDropFile(onFiles: (files: FileList) => void) {
    const props: FileDropProps = {
        onDragOver, onDrop
    }

    return props;

    function onDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        onFiles?.(e.dataTransfer.files);
    }
}