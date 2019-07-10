import { property } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import "./styles.css?name=imported-css-module";
import template from "./template.html";

import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/monokai-sublime.css?name=highlight-monokai";

import escapeHtml from "escape-html";


const enum Language {
    Javascript = "javascript",
    HTML = "xml",
    CSS = "css",
    Typescript = "typescript",
}

export class CodeBlock extends PolymerElement {

    /**
     * Specify the language used.  Defaults to `javascript`
     */
    @property({ type: String, })
    public lang!: Language

    constructor () {
        super();
        switch (this.lang) {
            case Language.Javascript:
                hljs.registerLanguage(Language.Javascript, javascript);
                break;
            case Language.HTML:
                hljs.registerLanguage(Language.HTML, xml);
                break;
            case Language.CSS:
                hljs.registerLanguage(Language.CSS, css);
                break;
            case Language.Typescript:
                hljs.registerLanguage(Language.Typescript, typescript);
                break;
            default:
                hljs.registerLanguage(Language.Javascript, javascript);
                break;
        };

        this.codeEl = document.createElement("pre");
        this.codeEl.className = this.lang;
        this.codeEl.innerHTML = escapeHtml(this.innerHTML);

    }

    public connectedCallback () {
        super.connectedCallback();
    }

    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    async ready () {
        super.ready();
        this.shadowRoot!.appendChild(this.codeEl);
        hljs.highlightBlock(this.codeEl)
    }

    private codeEl: HTMLElement;

}

customElements.define("code-block", CodeBlock);
