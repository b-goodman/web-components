
/**
 * Sets multiple attributes to an Element.
 * @param el The Element to set.
 * @param attributeTuples An array of string tuples representing the attribute name and intended value.
 */
export const setAttributes = (el: Element, attributeTuples: Array<[string, string]> ) => {
    attributeTuples.forEach( (tuple) => {
        el.setAttribute(tuple[0], tuple[1]);
    });
    return el as HTMLElement;
};

export enum Direction {
    Horizontal = "horizontal",
    Verical = "vertical"
}
