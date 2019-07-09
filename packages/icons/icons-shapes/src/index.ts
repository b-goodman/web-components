import { property } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";


// import template from "./template.html";

import template from "../svg/base/dot.svg";



export class XIconsGeneric extends PolymerElement {

    @property({ type: String, })
    public value!: string;

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

customElements.define("x-icons-generic", XIconsGeneric);
