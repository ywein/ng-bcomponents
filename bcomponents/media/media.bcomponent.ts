import {Component, Directive, ElementRef, Input} from '@angular/core';
import {BComponent, BComponentInputs, DisplayType} from '../bcomponent';
import {HeadingBComponent} from '../heading/heading.bcomponent';

export type VerticalAlignment = "left" | "right";
export type HorizontalAlignment = "top" | "middle" | "bottom";
export class MediaAlignment {
    public vertical: VerticalAlignment;
    public horizontal: HorizontalAlignment;

    constructor(vertical: VerticalAlignment = "left", horizontal: HorizontalAlignment = "top") {
        this.vertical = vertical;
        this.horizontal = horizontal;
    }
}

export class MediaBase extends BComponent {
    @Input() alignment: MediaAlignment;
    @Input() heading: HeadingBComponent;
    @Input() title: string;
    @Input() body: string;
    @Input() link: string;
    @Input() src: string;
    @Input() alt: string;
    @Input() size: string;

    public mediaClass;

    constructor(el: ElementRef = void 0) {
        super("media", el);
    }

    public Initialize = (src: string = "", alt: string = "", heading: HeadingBComponent = null, title: string = "", size: string = "3", body: string = "", link: string = null, alignment: MediaAlignment = new MediaAlignment()): this => {
        this.heading = heading;
        this.title = title;
        this.body = body;
        this.link = link;
        this.alignment = alignment;
        this.src = src;
        this.size = size;
        if(this.ngOnChildChanges != null) this.ngOnChildChanges();
        return this;
    }

    ngOnChildChanges = () => {
        this.mediaClass = "media-" + this.alignment.vertical + " media-" + this.alignment.horizontal;
    }

    public isRight = (): boolean => {
        return this.alignment.vertical == "right";
    }

    public hasLink = (): boolean => {
        return this.link !== null;
    }

    public hasBody = (): boolean => {
        return !this.isNull(this.body);
    }
}

@Component({
    selector: "bc-media",
    templateUrl: "media.bcomponent.html",
    inputs: BComponentInputs,
    styles: ["/deep/ h1,h2,h3,h4,h5,h6 { margin-top: 0px; }"]
})
export class MediaBComponent extends MediaBase {
    constructor() { super(); }
}

@Directive({
    selector: "[bc-media]",
    inputs: BComponentInputs,
})
export class MediaBDirective extends MediaBase {
    constructor(el: ElementRef) { super(el); }
}