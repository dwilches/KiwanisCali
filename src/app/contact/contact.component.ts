import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    public emailAddress = "sultanadelvalle@kiwaniscali.org";
    public emailMailTo = `mailto:${this.emailAddress}`;

    constructor() { }

    ngOnInit() {
    }

}
