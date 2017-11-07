import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';


import { ChordCalculatorService } from './chordCalculator.service';

export function main() {
  describe('ChordCalculator Service', () => {
    // let chordCalculatorService: ChordCalculatorService;
    // let mockBackend: MockBackend;

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ChordCalculatorService
        ]
      });
    });

    it('should return a minor 2-5-1', async(() => {
      expect(TestBed.get(ChordCalculatorService).getMinor251()).toEqual('minor251');
    }));

    // it('should resolve to list of names when get called', async(() => {
    //   let chordCalculatorService = TestBed.get(ChordCalculatorService);
    //   let mockBackend = TestBed.get(MockBackend);

    //   mockBackend.connections.subscribe((c: any) => {
    //     c.mockRespond(new Response(new ResponseOptions({ body: '["Dijkstra", "Hopper"]' })));
    //   });

    //   chordCalculatorService.get().subscribe((data: any) => {
    //     expect(data).toEqual(['Dijkstra', 'Hopper']);
    //   });
    // }));
  });
}
