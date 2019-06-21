import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { getStatus } from "../utils";


@Component({
  tag: 'img-slideshow',
  styleUrl: 'styles.css',
  shadow: true
})
export class ImgSlideshow {

  constructor(){
    this.nextSlide = this.nextSlide.bind(this);
  }

  /**
 * The ID of the interval timer.  Used to clear the interval during `disconnectedCallback()`.
 */
  private intervalID!: number;

  /**
   * Array of child `img` elements as slides.
   */
  private slideElements: Array<HTMLImageElement> = [];


  /**
   * Array of URLs verified as pointing to existant assets.
   */
  @State() urls: Array<string> = [];

  /**
   * The index of the currently visible slide.
   */
  @State() currentSlideIndex: number = 0;



  /**
   * Optionally specify a value to place before *all* paths provided in `src`. For example:
   *
   * ```html
   * <img-slideshow base-url="https://picsum.photos" src='["/200/300", "/200/300"]' />
   * ````
   * would be the same as
   *
   * ```html
   * <img-slideshow src='["https://picsum.photos/200/300", "https://picsum.photos/200/300"]' />
   * ````
   */
  @Prop() baseUrl?: string = undefined;

  /**
  * JSON-formatted string array of image URLs.
  *
  * ```html
  * <img-slideshow src='["https://picsum.photos/200/300", "https://picsum.photos/200/300"]' />
  * ```
  */
  @Prop() src: string;

  /**
   * Optionally request that all URLs are filtered by a HTTP 200 status code.  For example:
   *
   * ```html
   * <img-slideshow src='["/realImgs/1.png", "/fakeImgs/1.png", "/realImgs/2.png"]' validate-urls />
   * ```
   *
   * would be the same as
   *
   * ```html
   * <img-slideshow src='["/realImgs/1.png", "/realImgs/2.png"]' validate-urls />
   * ```
   */
  @Prop() validateUrls?: boolean

  /**
   * Set the visibility duration (ms) of each slide.
   */
  @Prop() interval?: number = 2000;

  @Event({
    eventName: "slidetransition",
    composed: true,
    cancelable: true,
    bubbles: true,
  }) slideTransition: EventEmitter;


  async connectedCallback(){
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
      this.urls = urlRespFiltered || [];
    }else {
      this.urls = urlArray;
    };

    // this.nextSlide()
    // setInterval( this.nextSlide, this.interval)
  }

  componentWillLoad(){
    this.intervalID = setInterval( this.nextSlide, this.interval)
  }

  disconnectedCallback(){
    clearInterval(this.intervalID)
  }

  private slideTransitionHandler(slideIndices:{prevSlideIndex:number, newSlideIndex:number, totalSlides:number,}){
    this.slideTransition.emit(slideIndices)
  }

  private nextSlide() {
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

  render() {
    return (
      this.urls.map( (url, index) => {
        return <img class="slide" src={url} key={index} ref={(elem) => this.slideElements[index] = elem as HTMLImageElement}/>
      })
    )
  }
}
