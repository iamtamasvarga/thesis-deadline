import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCog6Tooth } from '@ng-icons/heroicons/outline';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  // imports: [NgIconComponent],
  // viewProviders: [provideIcons({ heroCog6Tooth })]
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
