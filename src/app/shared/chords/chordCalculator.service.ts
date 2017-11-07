import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

/**
 * This class provides chords and chord groupings
 */
@Injectable()
export class ChordCalculatorService {

  intervals = {
    0: {
      name: 'Enharmonic',
      halfSteps: 0
    },
    2: {
      name: 'Second',
      halfSteps: 2
    },
    3: {
      name: 'Minor 3rd',
      halfSteps: 3
    },
    4: {
      name: 'Major 3rd',
      halfSteps: 4
    },
    7: {
      name: 'Perfect 5th',
      halfSteps: 7
    }
  };

  chordQuality = {
    dim7: {
      name: 'dim7'
    },
    min7: {
      name: 'mmi7'
    },
    mi7b5: {
      name: 'mi7b5'
    },
    maj7: {
      name: 'maj7'
    },
    dom7: {
      name: '7'
    }
  };

  chordPatterns = {
    singleChord: {
      name: "Single Chord",
      pattern: [
        {
          halfStepsFromRoot: '0',
          quality: ['dim7', 'min7', 'mi7b5', 'maj7', 'dom7']
        }
      ]
    },
    major251: {
      name: "Major 2-5-1",
      pattern: [
        {
          halfStepsFromRoot: '0',
          quality: 'maj7'
        },
        {
          halfStepsFromRoot: '2',
          quality: 'dom7'
        },
        {
          halfStepsFromRoot: '7',
          quality: 'maj7'
        }
      ]
    },
    minor251: {
      name: "Minor 2-5-1",
      pattern: [
        {
          halfStepsFromRoot: '0',
          quality: 'mi7b5'
        },
        {
          halfStepsFromRoot: '2',
          quality: 'dom7'
        },
        {
          halfStepsFromRoot: '7',
          quality: 'min7'
        }
      ]
    }
  };

  noteInfo = {
    0: {
      name: "A",
      altName: [],
      range: [1, 8],
      interval: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      id: 0
    },
    1: {
      name: "A#",
      altName: ["Bb"],
      range: [1, 8],
      interval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
      id: 1
    },
    2: {
      name: "B",
      altName: ["Cb"],
      range: [1, 8],
      interval: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1],
      id: 2
    },
    3: {
      name: "C",
      altName: [],
      range: [1, 8],
      interval: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
      id: 3
    },
    4: {
      name: "C#",
      altName: ["Db"],
      range: [1, 8],
      interval: [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3],
      id: 4
    },
    5: {
      name: "D",
      altName: [],
      range: [1, 8],
      interval: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4],
      id: 5
    },
    6: {
      name: "Eb",
      altName: ["D#"],
      range: [1, 8],
      interval: [6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5],
      id: 6
    },
    7: {
      name: "E",
      altName: ["Fb"],
      range: [1, 8],
      interval: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6],
      id: 7
    },
    8: {
      name: "F",
      altName: ["E#"],
      range: [1, 8],
      interval: [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7],
      id: 8
    },
    9: {
      name: "F#",
      altName: ["Gb"],
      range: [1, 8],
      interval: [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      id: 9
    },
    10: {
      name: "G",
      altName: [],
      range: [1, 8],
      interval: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      id: 10
    },
    11: {
      name: "Ab",
      altName: ["G#"],
      range: [1, 8],
      interval: [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      id: 11
    }
  };

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor() {
  }

  getMinorChord(): string {
    return "minor Chord";
  }

  getMajorChord(): string {
    return "major chord";
  }

  // getRandomChord(chords: Array, qualties: Array): string {

  // }

  getRandomChordFromSelections(chords: Array<String>, qualities: Array<String>, chordToAvoid: String, includeEnharmonics: Boolean): string {
    if (!chords || !qualities) {
      console.log("Requested random chord before options were set");
      return "";
    }

    return "random chord!";
    // let root = this.selectedChordsDict[this.chordOptionsModel[Math.floor((Math.random() * this.chordOptionsModel.length-1) + 1)]];
    // let quality = this.selectedQualityDict[this.qualityOptionsModel[Math.floor((Math.random() * this.qualityOptionsModel.length-1) + 1)]];
    // let chord = root + " " + quality;
    // if (chord === chordToAvoid) {
    //   // retry once to get not the same chord
    //   root = this.selectedChordsDict[this.chordOptionsModel[Math.floor((Math.random() * this.chordOptionsModel.length-1) + 1)]];
    //   quality = this.selectedQualityDict[this.qualityOptionsModel[Math.floor((Math.random() * this.qualityOptionsModel.length-1) + 1)]];
    //   chord = root + " " + quality;
    // }
    // return chord;
  }

  getChord(rootKey: String, qualityKey: String): string {
    console.log("rootKey " + rootKey);
    debugger;
    return "";
    // return this.http.get('assets/data.json')
    //                 .map((res: Response) => res.json())
    // //              .do(data => console.log('server data:', data))  // debug
    //                 .catch(this.handleError);
  }

  getMajor251(): string {
    return "major251";
    // return this.http.get('assets/data.json')
    //                 .map((res: Response) => res.json())
    // //              .do(data => console.log('server data:', data))  // debug
    //                 .catch(this.handleError);
  }

  getRandom
}

