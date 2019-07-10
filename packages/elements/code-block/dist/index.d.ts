import { PolymerElement } from "@polymer/polymer/polymer-element";
import "./styles.css?name=imported-css-module";
import "highlight.js/styles/monokai-sublime.css?name=highlight-monokai";
declare const enum Language {
    Javascript = "javascript",
    HTML = "xml",
    CSS = "css",
    Typescript = "typescript"
}
export declare class CodeBlock extends PolymerElement {
    lang: Language;
    constructor();
    connectedCallback(): void;
    static readonly template: HTMLTemplateElement;
    ready(): Promise<void>;
    private codeEl;
}
export {};
