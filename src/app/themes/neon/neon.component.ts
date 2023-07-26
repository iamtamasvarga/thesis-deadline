import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-neon",
  templateUrl: "./neon.component.html",
  styleUrls: ["./neon.component.scss"],
})
export class NeonComponent implements OnInit {
  private audio!: HTMLAudioElement;
  private loadAudio() {
    this.audio = new Audio();
    this.audio.src = "../../assets/lets_get_it_started.mp3";
    this.audio.load();
  }

  playAudio() {
    this.audio.play();
  }

  constructor() {
    this.loadAudio();
  }

  ngOnInit() {
  }
}
