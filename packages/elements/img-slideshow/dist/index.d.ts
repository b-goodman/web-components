import { PolymerElement } from "@polymer/polymer/polymer-element";
import "./styles.css?name=imported-css-module";
/**
 * A custom element for displaying an automatically transitioning slideshow of images.
 */
export declare class ImgSlideshow extends PolymerElement {
    /**
     * JSON array of URLs to use as image sources.
     * E.g., `'["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'`
     */
    src: string;
    /**
     * Optionally specify a common root for each URL in `src`.
     * E.g., setting `base-url="https://picsum.photos"` with `src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]'` would be equivalent to `'["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'`
     */
    baseUrl?: boolean;
    /**
     * Optionally require that all URLs are checked for an HTTP Response 200 before inserting its sorce image as a slide.
     * Default: `false`.
     */
    validateUrls?: boolean;
    /**
     * Set the time between slide transitions (ms).
     * Default: `2000`
     */
    interval?: number;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    static readonly template: HTMLTemplateElement;
    ready(): void;
    /**
     * (Re)starts the slideshow.
     */
    start(): void;
    /**
     * Halts any future slide transitions.
     */
    stop(): void;
    /**
     * Advances the slideshow to the next slide.
     * Will emmit event `"slidetransition"` on transition.
     */
    nextSlide(): void;
    /**
     * Advances the slideshow to show the ith slide.
     * Negative indices will count back from the last slide.
     * @param newSlideIndex The index of the ith slide, starting from `0`
     */
    goto(newSlideIndex: number): void;
    /**
     * Moves the slideshow back to show the previous slide.
     */
    prevSlide(): void;
    /**
     * Refs to <img> elements used as slides.
     */
    private slideElements;
    /**
     * The ID of the interval timer.  Used to clear the interval during `disconnectedCallback()`.
     */
    private intervalID;
    /**
     * Array of URLs verified as pointing to existant assets.
     */
    private urls;
    /**
     * The index of the currently visible slide.
     */
    private currentSlideIndex;
    /**
     * Emits event `"slidetransition"` on transitioning to the next slide.
     */
    private slideTransitionHandler;
}
