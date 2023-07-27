import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { trigger, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: "app-baloons",
  templateUrl: "./baloons.component.html",
  styleUrls: ["./baloons.component.scss"],
})
export class BaloonsComponent implements AfterViewInit {
  @ViewChild("balloonContainer") balloonContainer: ElementRef | undefined =
  undefined;

  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.createBalloons(100);
  }

  random(num: number): number {
    return Math.floor(Math.random() * num);
  }

  getRandomStyles(): string {
    let r = this.random(255);
    let g = this.random(255);
    let b = this.random(255);
    let mt = this.random(200);
    let ml = this.random(50);
    let dur = this.random(15) + 5;
    return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7);
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation-duration: ${dur}s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
    `;
  }

  createBalloons(num: number): void {
    if (this.balloonContainer !== undefined) {
      let divContainer: HTMLDivElement = this.balloonContainer?.nativeElement;
      for (var i = num; i > 0; i--) {
        let balloon = this.renderer.createElement('div');
        balloon.classList.add("balloon");

        balloon.style.cssText = this.getRandomStyles();
        this.renderer.appendChild(divContainer, balloon);
      }
    }
  }
}
