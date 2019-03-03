import { Component, OnInit } from "@angular/core";
import { RouterModule, Routes, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MessagingService } from "../../services/messaging.service";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.component.html",
  styleUrls: ["./messaging.component.css"]
})
export class MessagingComponent implements OnInit {
  totalOutbox: number = 0;
  totalPriOutbox: number = 0;
  outboxquick: number = 0;
  outboxbulk: number = 0;
  outboxdigital: number = 0;
  intervalid: any;
  spinner: boolean = true;

  telco: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messagingService: MessagingService
  ) {}

  ngOnInit() {
    let local = localStorage.getItem("user");
    let type = JSON.parse(local).type;

    if (type == "telco") {
      this.telco = true;
      this.gettotaloutbox();
      this.intervalid = setInterval(() => {
        this.gettotaloutbox();
      }, 1000 * 4);
    } else {
      this.telco = false;
      this.getjustoutbox();
      this.intervalid = setInterval(() => {
        this.getjustoutbox();
      }, 1000 * 4);
    }

    this.router.navigate(["/messaging/compose/quick"]);
  }

  ngOnDestroy() {
    console.log("msging desroyyed");
    clearInterval(this.intervalid);
  }

  getjustoutbox() {
    this.spinner = true;
    this.messagingService
      .getalloutboxquickcount(this.authService.getSavedEmail())
      .subscribe(data => {
        if (data.success) {
          this.outboxquick = data.count;
        }

        this.messagingService
          .getalloutboxbulkcount(this.authService.getSavedEmail())
          .subscribe(data => {
            if (data.success) {
              this.outboxbulk = data.count;
            }

            this.messagingService
              .getalloutboxdigitalcount(this.authService.getSavedEmail())
              .subscribe(data => {
                if (data.success) {
                  this.outboxdigital = data.count;
                }

                this.totalOutbox =
                  this.outboxquick + this.outboxbulk + this.outboxdigital;
                this.spinner = false;
              });
          });
      });
  }

  gettotaloutbox() {
    this.spinner = true;
    this.messagingService
      .getalloutboxquickcount(this.authService.getSavedEmail())
      .subscribe(data => {
        if (data.success) {
          this.outboxquick = data.count;
        }

        // priority
        this.messagingService
          .getallprioutboxquickcount(this.authService.getSavedEmail())
          .subscribe(data => {
            if (data.success) {
              this.totalPriOutbox = data.count;
            }

            this.messagingService
              .getalloutboxbulkcount(this.authService.getSavedEmail())
              .subscribe(data => {
                if (data.success) {
                  this.outboxbulk = data.count;
                }

                this.messagingService
                  .getalloutboxdigitalcount(this.authService.getSavedEmail())
                  .subscribe(data => {
                    if (data.success) {
                      this.outboxdigital = data.count;
                    }

                    this.totalOutbox =
                      this.outboxquick + this.outboxbulk + this.outboxdigital;
                    this.spinner = false;
                  });
              });
          });
      });
  }

  composeClick() {
    console.log("Compose clicked");
  }
}
