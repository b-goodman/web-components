/* index.ts */

import { html, PolymerElement, } from "@polymer/polymer/polymer-element";
import * as template from "./template.html";
import "./styles.css?name=imported-css-module";

export class XDraggable extends PolymerElement {


    public value: string = "";

    public static get properies () {
        return {
            value: {
                notify: true,
                observer: "_valueChanged",
                type: String,
                value: "",
            }
        };
    }

    constructor () {
        super();
    }


    public connectedCallback () {
        super.connectedCallback();
    }

    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    ready () {
        super.ready();
    }

}

customElements.define("x-draggable", XDraggable);