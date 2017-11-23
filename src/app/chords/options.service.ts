import { Injectable } from '@angular/core';

/**
 * Data model for options saved for random chords, leveraging local storage where possible
 */
@Injectable()
export class OptionsService {

  options = {

  }

  constructor() {}

  setOption(key: string, value: any): void{
    this.options[key] = value;
  }

  getOptions(): Object {
    return this.options;
  }
}

