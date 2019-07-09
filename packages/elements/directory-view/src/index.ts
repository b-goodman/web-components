import { property } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import "./styles.css?name=imported-css-module";
import * as template from "./template.html";

export class DirectoryView extends PolymerElement {

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

customElements.define("directory-view", DirectoryView);
