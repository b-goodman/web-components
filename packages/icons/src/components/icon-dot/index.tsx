import { Component, h, Prop, Watch } from '@stencil/core';
import { icon_dot_base } from "../../svg/base";
import { icon_dot_outline } from "../../svg/outline";
import { StyleType } from "../../utils"

@Component({
  tag: 'icon-dot',
  styleUrl: 'index.css',
  shadow: true
})
export class IconDot {

  private iconData: any;

  @Prop() type: StyleType = StyleType.Base;

  @Watch("type")
  validateTypeProp( newValue: StyleType, _oldValue?: StyleType){
    const isValidType = Object.values(StyleType).includes(newValue);
    if (!isValidType){
      throw new Error(`Attribute "type" (${newValue}) must be one of: ${Object.values(StyleType)}`);
    }
  }

  constructor(){
    this.validateTypeProp(this.type);
  }

  componentWillRender(){
    switch (this.type) {
      case StyleType.Base:
        this.iconData = icon_dot_base;
        break;
      case StyleType.Outline:
        this.iconData = icon_dot_outline;
      default:
        break;
    }
  }

  render() {
    return <img src={this.iconData}/>
  }
}
