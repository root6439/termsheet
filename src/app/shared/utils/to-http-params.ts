import { HttpParams } from '@angular/common/http';

export function toHttpParams(obj: Record<string, any>): HttpParams {
  let params = new HttpParams();

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      params = params.set(key, String(obj[key]));
    }
  }

  return params;
}
