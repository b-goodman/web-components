export const splitCSS = `
:host {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    width: 98vw;
    height: auto;
    display: flex;
    justify-items: center;
    align-items: center;
}
.flex {
    display: flex;
    flex-direction: row;
}

.gutter {
    background: black;
}

.gutter.gutter-horizontal {
    cursor: ew-resize;
}

.split, .gutter.gutter-horizontal {
    float: left;
}
.gutter.gutter-horizontal {
    cursor: ew-resize;
}`;