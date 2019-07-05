import { property } from "@polymer/decorators";
import { PolymerElement, } from "@polymer/polymer/polymer-element";

import {splitCSS} from "./styles";

import Split from "split.js";
import shortUUID from "short-uuid";

import setAttributes from "set-attribute-tuples";

export class SplitPane extends PolymerElement {

    @property({ type: String, notify: true })
    public direction: "horizontal" | "vertical" = "horizontal";

    constructor () {
        super();

        const shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement("style");
        style.innerText = splitCSS;
        shadow.appendChild(style);

        const children = Array.from(this.children).map( (childEl) => {
            const id = `${shortUUID.generate()}`;
            return setAttributes(childEl as HTMLElement, [ ["id", id], ["class", "pane"]]);
        });

        const wrapper = document.createElement("div");
        setAttributes( wrapper, [ ["id", "wrapper"], ["class", "flex" ]]);

        children.forEach( el => wrapper.appendChild(el) );
        shadow.appendChild(wrapper);

        const paneSize = this.retrievePaneSize( new Array(children.length).fill(Math.floor(100 / children.length)) );
        console.log(paneSize)

        this.handleDragEnd = this.handleDragEnd.bind(this);

        console.log(this.direction)
        this.split = Split( Array.from(shadow.querySelectorAll(".pane")) as HTMLDivElement[], {
            direction: this.direction,
            sizes: paneSize,
            elementStyle: (_dimension, size, gutterSize) => ({
                'flex-basis': `calc(${size}% - ${gutterSize}px)`,
            }),
            gutterStyle: (_dimension, gutterSize) => ({
                'flex-basis':  `${gutterSize}px`,
            }),
            onDragEnd: () => {
                this.handleDragEnd()
            },
        });
    }

    ready () {
        super.ready();
    }

    private storageKey: string = "paneSize";

    private split: Split.Instance;

    private retrievePaneSize (defaultSizes: number[]) {
        const sizesStored = window.localStorage.getItem(this.storageKey) || undefined;
        return sizesStored ? JSON.parse(sizesStored) as number[] : defaultSizes;
    }

    private handleDragEnd (newPaneSizes?: number[]) {
        window.localStorage.setItem(this.storageKey, JSON.stringify(newPaneSizes || this.split.getSizes() ));
    }

}

customElements.define("split-pane", SplitPane);
