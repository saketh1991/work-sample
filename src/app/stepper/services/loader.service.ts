import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  loadingFlag: any = {};

  load(loaderKey: string, observable: Observable<any>): Observable<any> {
    const subject: Subject<any> = new Subject<any>();
    this.loadingFlag[loaderKey] = true;

    observable.subscribe((res: any) => {
      delete this.loadingFlag[loaderKey];
      subject.next(res);
    }, (err: any) => {
      delete this.loadingFlag[loaderKey];
      subject.error(err);
    });

    return subject.asObservable();
  }

  setLoading(loaderKey: string): void {
    this.loadingFlag[loaderKey] = true;
  }

  isLoading(loaderKey: string): boolean {
    return this.loadingFlag[loaderKey];
  }
}
