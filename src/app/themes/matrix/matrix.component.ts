import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-matrix",
  templateUrl: "./matrix.component.html",
  styleUrls: ["./matrix.component.scss"],
})
export class MatrixComponent implements AfterViewInit {
  @ViewChild("matrix") matrixCanvas!: ElementRef<HTMLCanvasElement>;
  interval!: NodeJS.Timer;
  constructor() {}

  ngAfterViewInit(): void {
    this.initMatrix();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    clearInterval(this.interval);
    this.initMatrix();
  }

  initMatrix(): void {
    const canvas = this.matrixCanvas.nativeElement;
    const ctx = canvas.getContext("2d");

    console.log(ctx);
    if (ctx !== null) {
      const w = (canvas.width = document.body.offsetWidth);
      const h = (canvas.height = document.body.offsetHeight);
      const cols = Math.floor(w / 20) + 1;
      const ypos = Array(cols).fill(0);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      this.interval = setInterval(() => this.matrix(ctx, w, h, cols, ypos), 50);
    }
  }

  matrix(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    cols: number,
    ypos: any[]
  ): void {
    if (ctx !== null) {
      ctx.fillStyle = "#0001";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#0f0";
      ctx.font = "15pt monospace";

      ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }
  }
}
