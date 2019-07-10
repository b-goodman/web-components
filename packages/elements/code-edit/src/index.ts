import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import * as CodeMirror from "codemirror";
import * as template from "./template.html";
import "codemirror/lib/codemirror.css";
import "../node_modules/codemirror/theme/monokai.css?name=theme-monokai";
import "../node_modules/codemirror/mode/javascript/javascript.js";

export class CodeEdit extends PolymerElement {

    public editor: CodeMirror.Editor = null;
    public value: string = "";

    public static get properies () {
        return {
            editor: {
                notify: true,
                observer: "_valueChanged",
                type: Object,

            },

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
        this._onChangeHandler = this._onChangeHandler.bind(this);
        this._onBeforeChangeHandler = this._onBeforeChangeHandler.bind(this);
    }

    private _valueChanged (value: string) {
        if (!this.editor) {
            return;
        }
        if (this.editor.getValue() !== value && value !== undefined &&
            value !== null) {
            if (typeof value !== "string") {
            value = String(value);
            }
            this.editor.setValue(value);
        } else if (value === undefined || value === null) {
            this.editor.setValue("");
        }
    }

    private _onChangeHandler () {
        this.value = this.editor.getValue();
    }

    private _onBeforeChangeHandler (_instance, changeObj) {
        const ev = new CustomEvent("before-change", {
            bubbles: false,
            cancelable: false,
            composed: false,
            detail: {
                change: changeObj,
            },
        });
        this.dispatchEvent(ev);
        if (ev.detail.change.canceled) {
            this.value = this.editor.getValue();
        }
    }


    public connectedCallback () {
        super.connectedCallback();
        if (!this.editor) {
            return;
        }
        this.editor.on("change", this._onChangeHandler);
        this.editor.on("beforeChange", this._onBeforeChangeHandler);
        this.editor.refresh();
    }

    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    ready () {
        super.ready();
        this.editor = CodeMirror( this.$.codemirror as HTMLDivElement, {
            mode: {name: "javascript", json: true},
            theme: "monokai"
    });
    }

}

customElements.define('code-edit', CodeEdit);