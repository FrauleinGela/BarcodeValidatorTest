import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
/**
 * Service that will call the request to the api
 */
@Injectable()
export class BarcodeApiService {

  constructor(private http: Http) {
  }

  public validateBarcode(code: String): Observable<any> {
    return this.http.get('https://mutec.gomus.de/api/v3/barcodes/' + code)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }
}

