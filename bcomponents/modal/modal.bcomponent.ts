import {Component} from '@angular/core';
import {BComponent, BComponentAttributes, BComponentInputs, DisplaySize} from '../bcomponent';

@Component({
    selector: 'modal-bcomponent',
    templateUrl: 'modal.bcomponent.html',
    directives: [BComponentAttributes],
    inputs: BComponentInputs.concat(['fade', 'title', 'body', 'footer'])
})
export class ModalBComponent extends BComponent {
    public fade: boolean = true;
    public title: string;
    public body: string;
    public footer: string;

    constructor() {
        super("modal");
    }

    public Initialize = (fade: boolean = true, title: string = "", body: string = "", footer: string = ""): ModalBComponent => {
        this.fade = fade;
        this.title = title;
        this.body = body;
        this.footer = footer;
        return this;
    }

    ngOnChildChanges = () => {
        if(this.fade) {
            this.baseClass = "modal fade";
        }
    }

    public hasTitle = (): boolean => {
        return !this.isNull(this.title);
    }

    public hasBody = (): boolean => {
        return !this.isNull(this.body);
    }

    public hasFooter = (): boolean => {
        return !this.isNull(this.footer);
    }

    public open = () => {
        this.getSelector().modal('show');
    }

    public close = () => {
        this.getSelector().modal('hide');
    }
}