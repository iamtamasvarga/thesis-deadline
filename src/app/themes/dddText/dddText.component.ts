import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-dddText",
  templateUrl: "./dddText.component.html",
  styleUrls: ["./dddText.component.scss"],
})
export class DDDTextComponent implements AfterViewInit {
  @ViewChild("h1Element") h1Element: ElementRef | undefined = undefined;
  @ViewChild("spanElement") spanElement: ElementRef | undefined = undefined;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.spanElement !== undefined && this.h1Element !== undefined) {
      let span: HTMLSpanElement = this.spanElement.nativeElement;
      let h1: HTMLSpanElement = this.h1Element.nativeElement;
      var text = h1.innerText;
      this.renderer.setAttribute(span, "data-heading", text);
      this.renderer.setAttribute(h1, "data-heading", text);
    }
  }
}
