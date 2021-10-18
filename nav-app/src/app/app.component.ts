import { Component, ViewChild, DoCheck, HostListener, OnInit } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { ConfigService } from './config.service';
import * as globals from "./globals";
import { IconsService } from "./icons.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild(TabsComponent) tabsComponent;

    nav_version: string = globals.nav_version;
    public user_theme: string;

    @HostListener('window:beforeunload', ['$event'])
    promptNavAway($event) {
        if (!this.configService.getFeature('leave_site_dialog')) return;
        //this text only shows in the data, not visible to user as far as I can tell
        //however, if it's not included the window doesn't open.
        $event.returnValue='Are you sure you want to navigate away? Your data may be lost!';
    }

    constructor(public configService: ConfigService, private iconsService: IconsService) {
        Array.prototype.includes = function(value): boolean {
            // console.log("checking include")
            for (let i = 0; i < this.length; i++) {
                if (this[i] === value) return true
            }
            return false;
        }
        window.onload = () => this.matcher();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', () => this.matcher());
    }

    ngOnInit() {
        this.iconsService.registerIcons();
    }

    matcher() {
        this.user_theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'theme-override-dark' : 'theme-override-light';
      }
}
