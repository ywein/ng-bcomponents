import {Component} from '@angular/core';
import {BComponent, BComponentAttributes, BComponentInputs, DisplayType} from '../bcomponent';

@Component({
    selector: "panel-bcomponent",
    templateUrl: "panel.bcomponent.html",
    directives: [BComponentAttributes],
    inputs: BComponentInputs.concat(['header', 'footer', 'type'])
})
export class PanelBComponent extends BComponent {
    public header: string;
    public footer: string;
    public type: DisplayType = "default";

    constructor() {
        super("panel panel-default");
    }

    public Initialize = (header: string = null, footer: string = null, type: DisplayType = "default"): PanelBComponent => {
        this.header = header;
        this.footer = footer;
        this.type = type;
        if(this.ngOnChildChanges != null) this.ngOnChildChanges();
        return this;
    }

    ngOnChildChanges = () => {
        this.baseClass = "panel panel-" + this.type;
    }
}