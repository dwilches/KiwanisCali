import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const SEND_MAIL_URL = "https://us-central1-kiwaniscali.cloudfunctions.net/sendMail";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    public emailAddress = "sultanadelvalle@kiwaniscali.org";
    public emailMailTo = `mailto:${this.emailAddress}`;
    public emailFormShown = true;

    public emailSent = false;
    public sendingEmail = false;
    public formData: any = {};
    public sendingEmailError = false;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    public showEmailForm() {
        this.emailFormShown = true;
        this.emailSent = false;
        this.sendingEmail = false;
        this.formData = {};
    }

    public canSubmit() {
        return this.formData.name && this.formData.message;
    }

    public sendEmail() {
        this.sendingEmail = true;
        this.sendingEmailError = false;
        this.http.post(SEND_MAIL_URL, this.formData)
            .toPromise()
            .then(_ => {
                this.sendingEmail = false;
                this.emailFormShown = false;
                this.emailSent = true;
            })
            .catch(err => {
                this.sendingEmail = false;
                this.sendingEmailError = true;
                console.error("Error occurred", err)
            });
    }
}
