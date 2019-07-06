import { html, PolymerElement, } from "@polymer/polymer/polymer-element";
import { customElement, property, query } from "@polymer/decorators";
import * as template from "./template.html";
import "./styles.css?name=imported-css-module";

import interact from "interactjs";

@customElement("x-draggable")
export class XDraggable extends PolymerElement {

    @property({ type: Object })
    public pos: {x: number, y: number} = {x:0, y:0};

    @query("div.drag")
    private dragEl!: HTMLDivElement;


    constructor () {
        super();
        this.dragMoveListener = this.dragMoveListener.bind(this);
    }

    public connectedCallback () {
        super.connectedCallback();
        interact('.drag').draggable({
            inertia: true,
            autoScroll: true,
            onmove: this.dragMoveListener,
        });
    }

    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    ready () {
        super.ready();
    }


    private dragMoveListener = (event: Interact.DragEvent) => {
        this.pos.x += event.dx,
        this.pos.y += event.dy;
        this.dragEl.style.setProperty("--poz-x", `${this.pos.x}px`);
        this.dragEl.style.setProperty("--poz-y", `${this.pos.y}px`);
    };

}
