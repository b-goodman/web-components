import { customElement, property, queryAll } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import "./styles.css?name=imported-css-module";
import * as template from "./template.html";

import { getStatus } from './getStatus';
import setAttributeTuples from "set-attribute-tuples";

/**
 * A custom element for displaying an automatically transitioning slideshow of images.
 */
@customElement("img-slideshow")
export class ImgSlideshow extends PolymerElement {

    /**
     * JSON array of URLs to use as image sources.
     * E.g., `'["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'`
     */
    @property({ type: String, })
    public src!: string;

    /**
     * Optionally specify a common root for each URL in `src`.
     * E.g., setting `base-url="https://picsum.photos"` with `src='["/id/100/200/300", "/id/101/200/300", "/id/102/200/300"]'` would be equivalent to `'["https://picsum.photos/id/100/200/300", "https://picsum.photos/id/101/200/300", "https://picsum.photos/id/102/200/300"]'`
     */
    @property({ type: String, })
    public baseUrl?: boolean;

    /**
     * Optionally require that all URLs are checked for an HTTP Response 200 before inserting its sorce image as a slide.
     * Default: `false`.
     */
    @property({ type: Boolean, })
    public validateUrls?: boolean = false;

    /**
     * Set the time between slide transitions (ms).
     * Default: `2000`
     */
    @property({ type: Number })
    public interval?: number = 2000;


    constructor () {
        super();
        this.nextSlide = this.nextSlide.bind(this);
    }

    async connectedCallback(){
        super.connectedCallback();
        const urlArrayPartial = (JSON.parse(this.src) as string[]);
        const urlArray= (this.baseUrl) ? urlArrayPartial.map( (basename) => {return `${this.baseUrl}${basename}`}) : urlArrayPartial;
        if (this.validateUrls){
            const urlRespFiltered = await Promise.all(urlArray.map( async (url) => {
            try {
                return (await getStatus(url) === 200) ? url : null;
            } catch (err){
                return null;
            }
        }));
            this.urls = urlRespFiltered.filter(n => n) as string[] || [];
        }else {
            this.urls = urlArray;
        };
        const insertSlides = this.urls.map( ( url: string, index ) => {
            const slide = document.createElement("img");
            const id = index.toString();
            setAttributeTuples(slide, [ ["src", url], ["key", id], ["id", id], ["class", `${index == 0 ? "visible" : ""}`] ]);
            return slide;
        });
        insertSlides.forEach( (elem) => {
            this.shadowRoot!.querySelector("div")!.appendChild(elem)
        });
        this.intervalID = window.setInterval( this.nextSlide, this.interval);
    }

    disconnectedCallback(){
        clearInterval(this.intervalID)
    }


    static get template () {
        const stringArray = [`${template}`] as any;
        stringArray.raw = [`${template}`];
        return html(stringArray as TemplateStringsArray);
    }

    ready () {
        super.ready();
    }

    /**
     * (Re)starts the slideshow.
     */
    public start(){
        this.intervalID = window.setInterval( this.nextSlide, this.interval);
    }

    /**
     * Halts any future slide transitions.
     */
    public stop(){
        window.clearInterval(this.intervalID)
    }

    /**
     * Advances the slideshow to the next slide.
     * Will emmit event `"slidetransition"` on transition.
     */
    public nextSlide() {
        const totalSlides = this.urls.length;
        const prevSlideIndex = this.currentSlideIndex;
        const newSlideIndex = (prevSlideIndex + 1) % totalSlides;
        const prevSlide = this.slideElements[prevSlideIndex];
        prevSlide.classList.remove("visible");
        const nextSlide = this.slideElements[newSlideIndex];
        nextSlide.classList.add("visible");
        this.currentSlideIndex = newSlideIndex;
        this.slideTransitionHandler({prevSlideIndex, newSlideIndex, totalSlides})
    }

    /**
     * Advances the slideshow to show the ith slide.
     * Negative indices will count back from the last slide.
     * @param newSlideIndex The index of the ith slide, starting from `0`
     */
    public goto(newSlideIndex: number){
        if ( Math.abs(newSlideIndex) >= this.urls.length ) {
            throw new Error("New index out of slide array bounds.")
        };
        this.slideElements.forEach( (slideElem) => {
            slideElem.className = "";
        })
        this.slideElements[(newSlideIndex < 0 ? (newSlideIndex) + this.urls.length : newSlideIndex )].className = "visible";
    }

    /**
     * Moves the slideshow back to show the previous slide.
     */
    public prevSlide() {
        // const prevSlideIndex = (this.currentSlideIndex > 0 ? this.currentSlideIndex : this.urls.length ) - 1;
        this.goto(this.currentSlideIndex - 1);
    }

    /**
     * Refs to <img> elements used as slides.
     */
    @queryAll("img")
    private slideElements!: NodeListOf<HTMLImageElement>;

    /**
     * The ID of the interval timer.  Used to clear the interval during `disconnectedCallback()`.
     */
    private intervalID!: number;


    /**
     * Array of URLs verified as pointing to existant assets.
     */
    private urls: Array<string> = [];

    /**
     * The index of the currently visible slide.
     */
    private currentSlideIndex: number = 0;

    /**
     * Emits event `"slidetransition"` on transitioning to the next slide.
     */
    private slideTransitionHandler(slideIndices:{prevSlideIndex:number, newSlideIndex:number, totalSlides:number,}){
        this.dispatchEvent(new CustomEvent("slidetransition", {detail: slideIndices}));
    }

};
