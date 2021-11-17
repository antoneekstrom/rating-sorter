export type Compare<T> = (a: T, b: T) => Promise<boolean>;

export default async function quickSort<T>(
    arr: T[],
    compare: Compare<T>,
    start = 0,
    end = arr.length - 1
): Promise<T[]> {
    if (start >= end) return;

    let index = await partition(arr, compare, start, end);

    await quickSort(arr, compare, start, index - 1);
    await quickSort(arr, compare, index + 1, end);

    return arr;
}

function swap<T>(arr: T[], a: number, b: number) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

async function partition<T>(
    arr: T[],
    compare: Compare<T>,
    start: number,
    end: number
) {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        const result = await compare(arr[i], pivotValue);
        if (result) {
            swap(arr, i, pivotIndex);
            pivotIndex++;
        }
    }

    swap(arr, pivotIndex, end);

    return pivotIndex;
}
