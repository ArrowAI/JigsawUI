// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export interface IntentCavasOptions {
	baseClass: string;
	overlay?: boolean;
	closeBy: string;
	toggleBy?: any;
}

/**
 * Setup off Convas
 */
@Directive({
	selector: '[ktIntentcanvas]',
	exportAs: 'ktIntentcanvas',
})
export class IntentComponentDirective implements AfterViewInit {
	// Public properties
	@Input() options: IntentCavasOptions;
	// Private properties
	private offcanvas: any;

	/**
	 * Directive Constructor
	 * @param el: ElementRef
	 */
	constructor(private el: ElementRef) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		setTimeout(()=>{
			// alert();
			console.log("fsdfsdfdsfdsfdsfsdfds",this.el.nativeElement)
			this.offcanvas = new KTIntentcanvas(this.el.nativeElement, this.options);
		})
	}

	/**
	 * Returns the offCanvas
	 */
	getOffcanvas() {
		return this.offcanvas;
	}
}
