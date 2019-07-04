import copy = require("clipboard-copy");

import { property } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import "./styles.css?name=imported-css-module";
import * as template from "./template.html";

export class CopyClick extends PolymerElement {

    @property({ type: String, })
    public text!: string;

    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    public connectedCallback () {
        super.connectedCallback();
    }

    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    private handleClick () {
        copy(this.text).then( () => {
            console.log(this.text);
            this.dispatchEvent( new CustomEvent("copied") );
        });
    }

    ready () {
        super.ready();
        this.$.copybtn.addEventListener( "click", this.handleClick);

    }

}

customElements.define("copy-click", CopyClick);
