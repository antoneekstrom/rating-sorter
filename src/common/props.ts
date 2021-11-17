import { joinClasses } from "./classes";

/**
 *
 */

export type HTMLProps<E = HTMLElement> = React.DetailedHTMLProps<
    React.HTMLAttributes<E>,
    E
>;
/**
 *
 */

export type HTMLReactListener<E = React.SyntheticEvent> = (event: E) => void;
/**
 * Combines two or more props. Joins classNames and merges listeners if they exist on multiple props.
 * @param props
 */

export function combineProps<T = HTMLProps>(...props: {}[]): T {
    return props.reduce<T>(propReducer, {} as T);

    function propReducer(result: T, prop: any): T {
        let r = { ...result };

        for (const attr in prop) {
            if (Object.prototype.hasOwnProperty.call(prop, attr)) {
                const val = prop[attr];
                const rval = r[attr];
                if (typeof val == "function") {
                    r[attr] = rval ? combineListeners(rval, val) : val;
                } else if (attr == "className") {
                    r[attr] = joinClasses(rval, val);
                } else {
                    r[attr] = val;
                }
            }
        }

        return r;
    }

    function combineListeners<E = React.SyntheticEvent>(
        a: HTMLReactListener<E>,
        b: HTMLReactListener<E>
    ) {
        return (e: E) => {
            a?.(e);
            b?.(e);
        };
    }
}
