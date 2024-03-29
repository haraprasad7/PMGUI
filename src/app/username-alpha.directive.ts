import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUsernameAlpha]'
})
export class UsernameAlphaDirective {

  constructor(private el:ElementRef) { }

  @HostListener('keypress', ['$event']) onInputChange (event:KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value;
    input.value = inputValue.replace(/[^a-zA-Z]/g, '');
    this.el.nativeElement.value = inputValue;
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

}
