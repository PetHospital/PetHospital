import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { RoomInfo, RoleInfo } from './../../model/model';

const API_URL = environment.apiUrl;
const JSON_URL = environment.jsonUrl;

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}

    getRoomInfo(): Observable<RoomInfo[]> {
        let dataUrl = JSON_URL + '/navigation.json';
        return this.http.get<RoomInfo[]>(dataUrl);
    }

    getRoleInfo(): Observable<RoleInfo[]> {
        let dataUrl = JSON_URL + '/role-info.json';
        return this.http.get<RoleInfo[]>(dataUrl);
    }
}

