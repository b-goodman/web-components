import { Component, Element, h, Host, Prop, State, Watch } from "@stencil/core";
import shortUUID from "short-uuid";
import Split from "split.js";
import { setAttributes } from "../utils";

@Component({
  shadow: true,
  styleUrl: "index.css",
  tag: "split-pane",
})
export class SplitPane {

  private storageKey: string = "paneSize";
  private split?: Split.Instance;

  @Element() public el: HTMLElement;

  @Prop() public direction?: "horizontal" | "vertical" = "horizontal";
  @Watch("direction")
  validateDirection (newValue: string) {
    const isValidType = ["horizontal", "vertical"].includes(newValue);
    if (!isValidType) {
      throw new Error(`Attribute "direction" (${newValue}) must be one of: "horizontal", "vertical"`);
    }
  }

  @State() private paneSize?: number[] = [];

  private retrievePaneSize (defaultSizes: number[]) {
    const sizesStored = window.localStorage.getItem(this.storageKey) || undefined;
    return sizesStored ? JSON.parse(sizesStored) as number[] : defaultSizes;
  }

  private handleDragEnd (newPaneSizes: number[]) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(newPaneSizes));
  }

  connectedCallback () {
    // const children = Array.from(this.el.children);
    const children = Array.from(this.el.children).map( (child) => {
      const id = `${shortUUID.generate()}`;
      return setAttributes(child, [ ["id", id], ["class", "pane"]]);
    });
    this.paneSize = this.retrievePaneSize( new Array(children.length).fill(Math.floor(100 / children.length)) );
    this.split = Split(children, {
      direction: this.direction,
      minSize: this.paneSize,
      onDragEnd: () => this.handleDragEnd
    });
  }

  /**
   * returns an array of percents, suitable for using with setSizes or creation. Not supported in IE8. Added in v1.1.2:
   */
  public getSizes () {
    return this.split.getSizes();
  }

  public render () {
    return (
      <Host id={shortUUID.generate()}>
          {<slot/>}
      </Host>
    );
  }
}
