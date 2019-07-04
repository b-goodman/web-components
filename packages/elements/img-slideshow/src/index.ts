import { property, queryAll } from "@polymer/decorators";
import { html, PolymerElement, } from "@polymer/polymer/polymer-element";

import "./styles.css?name=imported-css-module";
import * as template from "./template.html";

import { getStatus } from './getStatus';

export class ImgSlideshow extends PolymerElement {


    @property({ type: String, })
    public src!: string;

    @property({ type: String, })
    public baseUrl?: boolean;

    @property({ type: Boolean, })
    public validateUrls?: boolean = false;

    @property({ type: Number })
    public interval?: number = 2000;

    @queryAll("img")
    private slideElements!: NodeListOf<HTMLImageElement>;

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
            slide.setAttribute("src", url);
            slide.setAttribute("key", index.toString());
            slide.setAttribute("id", index.toString());
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
     * The ID of the interval timer.  Used to clear the interval during `disconnectedCallback()`.
     */
    private intervalID!: number;


    /**
     * Array of URLs verified as pointing to existant assets.
     */
    private urls: Array<string> = [];

    // private insertSlides: HTMLImageElement[] = [];

    /**
     * The index of the currently visible slide.
     */
    private currentSlideIndex: number = 0;

    private nextSlide() {
        const totalSlides = this.urls.length;
        const prevSlideIndex = this.currentSlideIndex;
        const newSlideIndex = (prevSlideIndex + 1) % totalSlides;

        const prevSlide = this.slideElements[prevSlideIndex];
        // const prevSlide =  this.$[`img#${prevSlideIndex}`] as HTMLElement;
        prevSlide.classList.remove("visible");

        const nextSlide = this.slideElements[newSlideIndex];
        // const nextSlide =  this.$[`img#${newSlideIndex}`] as HTMLElement;
        nextSlide.classList.add("visible");

        this.currentSlideIndex = newSlideIndex;
        this.slideTransitionHandler({prevSlideIndex, newSlideIndex, totalSlides})
    }

    private slideTransitionHandler(slideIndices:{prevSlideIndex:number, newSlideIndex:number, totalSlides:number,}){
        this.dispatchEvent(new CustomEvent("slidetransition", {detail: slideIndices}));
    }

}

customElements.define("img-slideshow", ImgSlideshow);
