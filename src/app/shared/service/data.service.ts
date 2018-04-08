import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { RoomInfo, RoleInfo, ExamQuestion, PracticeItem, Mistake, Collection, DiseaseTree, PracticeTitle, PracticeTab } from './../../model/model';

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

    getMistakes(): Observable<Mistake[]> {
        let dataUrl = JSON_URL + '/mistakes.json';
        return this.http.get<Mistake[]>(dataUrl);
    }

    getCollection(): Observable<Collection[]> {
        let dataUrl = JSON_URL + '/collections.json';
        return this.http.get<Collection[]>(dataUrl);
    }

    getQuestions(): Observable<ExamQuestion[]> {
        let dataUrl = JSON_URL + '/questionList.json';
        return this.http.get<ExamQuestion[]>(dataUrl);
    }

    getDiseases(): Observable<DiseaseTree[]> {
        let dataUrl = JSON_URL + '/diseaseTree.json';
        return this.http.get<DiseaseTree[]>(dataUrl);
    }

    getUserInfo(): Observable<Object> {
        let dataUrl = JSON_URL + '/userinfo.json';
        return this.http.get<Object>(dataUrl);
    }
    
    getPracticeTitle(): Observable<PracticeTitle[]> {
        let dataUrl = JSON_URL + '/practiceTitle.json';
        return this.http.get<PracticeTitle[]>(dataUrl);
    }

    getPracticeTab(): Observable<PracticeTab[]> {
        let dataUrl = JSON_URL + '/practiceTab.json';
        return this.http.get<PracticeTab[]>(dataUrl);
    }

    getPracticeItem(): Observable<PracticeItem[]> {
        let dataUrl = JSON_URL + '/examlist.json';
        return this.http.get<PracticeItem[]>(dataUrl);
    }
}

