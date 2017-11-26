import { Injectable } from '@angular/core';

@Injectable()
export class MetronomeWebWorker {

  /* Blog post for reference: https://www.html5rocks.com/en/tutorials/audio/scheduling/ */

  // This is where your methods and properties go, for example:
  timerID;
  interval = 100;
  onMessageCallback;

  constructor() {
  }

  setOnMessageCallback(callback: any) {
    this.onMessageCallback = callback;
  }

  postMessage(message: any) {
    let self = this;
    if (message == "start") {
      console.log("starting");
      this.timerID = setInterval(function () {
        self.onMessageCallback("tick");
      }, this.interval)
    } else if (message.interval) {
      console.log("setting interval");
      this.interval = message.interval;
      console.log("interval=" + this.interval);
      if (this.timerID) {
        clearInterval(this.timerID);
        this.timerID = setInterval(function () {
          self.onMessageCallback("tick");
        }, this.interval)
      }
    } else if (message == "stop") {
      console.log("stopping");
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }
}
