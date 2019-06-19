import { PolymerElement, html } from "@polymer/polymer/polymer-element";
import {customElement, property} from "@polymer/decorators";
import WolframNotebookEmbedder, { EmbeddedNotebook, EmbeddedNotebookEvents } from "wolfram-notebook-embedder";
import * as template from "./template.html";


@customElement("cloud-notebook")
export class CloudNotebook extends PolymerElement {

    cloudNotebook!:EmbeddedNotebook;

    @property({type: String})
    src!: string;

    constructor(){
        super();
    };

    static get template() {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    };

    ready() {
        super.ready();
    }

    async connectedCallback() {
        console.time(EmbeddedNotebookEvents.FIRST_PAINT_DONE);
        console.time(EmbeddedNotebookEvents.INITIAL_RENDER_DONE);
        this.cloudNotebook = await WolframNotebookEmbedder(this.src, this);

        this.cloudNotebook.addEventListener(EmbeddedNotebookEvents.FIRST_PAINT_DONE, () => {
            console.log(EmbeddedNotebookEvents.FIRST_PAINT_DONE)
            console.timeEnd(EmbeddedNotebookEvents.FIRST_PAINT_DONE);
        });

        this.cloudNotebook.addEventListener(EmbeddedNotebookEvents.INITIAL_RENDER_DONE, () => {
            console.timeEnd(EmbeddedNotebookEvents.INITIAL_RENDER_DONE);
        })
    }

}