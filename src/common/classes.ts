/**
 *
 * @param classes
 */
export function joinClasses(...classes: string[]): string {
    return classes
        .filter(
            (c) => c != undefined && c.length > 0 && c.search(/^\s+$/g) == -1
        )
        .join(" ")
        .replace(/\s+/g, " ");
}
