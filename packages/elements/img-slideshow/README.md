# img-slideshow

A custom element for displaying a transitioning slideshow of images.

```html
<!DOCTYPE html>

<head>
    <title>ImgSlideshow</title>
    <script src="https://unpkg.com/img-slideshow/dist/index.js"></script>
</head>

<body>
    <img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' />
</body>

<script>
    window._slides = document.querySelector("img-slideshow");
</script>

</html>
```

## Attributes

---

### `src`

String JSON array of URLs to use as image sources.

```html
src='["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'
```

---

### `base-url`

Optionally specify a common root for each URL in `src`.

```html
<img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' />
```

is equivalent to

```html
<img-slideshow src='["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]' \>
```

---

### `interval`

Set the time between slide transitions (ms).
Defaults to `2000`.

## Events

---

### `"slidetransition"`

Fired on transitioning to the next slide.

Handler callback can be a function of type

```typescript
(e?: Event) => void
```

such that

```typescript
e.detail: {prevSlideIndex: number, newSlideIndex: number, totalSlides: number,}
```

For example,

```javascript
document.querySelector("img-slideshow").addEventListener( "slidetransition", (e) => {
    console.log(e.detail.newSlideIndex)
})

//0
//1
//2
//...

```

## Methods

---

### `nextSlide(): void`

Advances the slideshow to the next slide, emmiting event `"slidetransition"` on transition.

---

### `prevSlide(): void`

Moves the slideshow back to show the previous slide.

---

### `goto(slideIndex: number): void`

Advances the slideshow to show the ith slide, using the indices of the `src` array.
Negative indices will count back from the last slide.

For example, given

```html
<img-slideshow base-url="https://picsum.photos" src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]' />
```

then the 1st slide corresponds to `"/id/101/200/300"` and is made as the current slide by

```javascript
const slides = document.querySelector("img-slideshow");
slides.goto(1);
```

---

### `stop(): void`

Stops the slideshow.

---

### `start(): void`

(Re)starts the slideshow.

---

## Development

May be imported into a project for use as a base class or whatever else.

```bash
npm install img-slideshow
```

```javascript
import {ImgSlideshow} from "img-slideshow";

class ABetterSlideshow extends ImgSlideshow {
 ...
}
```

Or if you'd rather contribute, then thats OK too.
