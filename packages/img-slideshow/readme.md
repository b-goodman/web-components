# `<img-slideshow>`

```html
<img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' />
```

---

## Usage

### Installation

```bash
yarn add img-slideshow
```

or

```bash
npm install --save img-slideshow
```

### In an HTML Document

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="img-slideshow.esm.js"></script>
  <script nomodule src="img-slideshow.js"></script>
</head>
<body>

  <img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' interval="2000" />

</body>
</html>
```

---

## Attributes

| Name | Desc. | Default |
| --- | --- | :---: |
| [`src`](#src) | JSON-formatted string array of image URLs. | - |
| [`base-url`](#base-url) | Optionally specify a value to place before all paths provided in [`src`](#src). | - |
| [`validate-urls`](#validate-urls) | Optionally request that all URLs are filtered by a HTTP 200 status code. | `false` |
| [`interval`](#interval) | Set the visibility duration (ms) of each slide. | `2000` |

### `src`

JSON-formatted string array of image URLs.

```html
<img-slideshow src='["https://picsum.photos/200/300", "https://picsum.photos/200/300"]' />
```

### `base-url`

Optionally specify a value to place before all paths provided in `src`.  For example:

```html
<img-slideshow base-url="https://picsum.photos" src='["/200/300", "/200/300"]' />
```

would be the same as

```html
<img-slideshow src='["https://picsum.photos/200/300", "https://picsum.photos/200/300"]' />
```

### `validate-urls`

Optionally request that all URLs are filtered by a HTTP 200 status code.  For example:

```html
<img-slideshow src='["/exists/1.png", "/notfound/1.png", "/exists/2.png"]' />
```

would be the same as

```html
<img-slideshow src='["/exists/1.png", "/exists/2.png"]' validate-urls />
```

### `interval`

Set the visibility duration (ms) of each slide.  For example, the default setting is identical to

```html
<img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' interval="2000" />
```
