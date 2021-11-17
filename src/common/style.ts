import { joinClasses } from "./classes";

/**
 *
 */
export type BaseStyleProps = {
    type?: "filled" | "outlined" | undefined;
    state?: "inactive" | undefined;
};

/**
 *
 * @param props
 * @param classes
 */
export function makeBaseStyle(
    props: BaseStyleProps,
    classes?: string
): { className: string } {
    const prefix = "feature-";
    return {
        className: joinClasses(
            classes,
            props.state && prefix + props.state,
            props.type && prefix + props.type
        ),
    };
}
