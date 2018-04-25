import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { RoomInfo, RoleInfo, ExamQuestion, PracticeItem, Mistake, Collection, DiseaseTree, PracticeTitle, PracticeTab, ExamItem, TestResult, DialogInfo, Operation } from './../../model/model';
const API_URL = environment.apiUrl;
const JSON_URL = environment.jsonUrl;

@Injectable()
export class DataService {
    header: HttpHeaders;
    token: String;
    constructor(private http: HttpClient) {
        let strcookie = document.cookie;
        let arrcookie = strcookie.split("; ");
        for ( let i = 0; i < arrcookie.length; i++) {
           let arr = arrcookie[i].split("=");
           if (arr[0] === "token") {
              this.token = arr[1];
           }
        }
        this.header = new HttpHeaders({'Authorization': 'Token ' + this.token});
    }

    getRoomInfo(): Observable<RoomInfo[]> {
        let dataUrl = JSON_URL + '/roomInfo.json';
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

    getQuestions(id: number): Observable<ExamQuestion[]> {
        let dataUrl = 'http://115.159.143.108/test/exam/' + id;
        return this.http.get<ExamQuestion[]>(dataUrl);
    }

    getExercise(level: String): Observable<ExamQuestion[]> {
        let dataUrl = 'http://115.159.143.108/test/exercise/' + level;
        return this.http.get<ExamQuestion[]>(dataUrl);
    }

    getPracticeItem(): Observable<PracticeItem[]> {
        let dataUrl = JSON_URL + '/practicelist.json';
        return this.http.get<PracticeItem[]>(dataUrl);
    }
    getDiseases(): Observable<any[]> {
        let dataUrl = API_URL + '/disease/group';
        return this.http.get<any[]>(dataUrl);
    }

    getDiseaseImages(): Observable<any[]> {
        let dataUrl = API_URL + '/disease/images';
        return this.http.get<any[]>(dataUrl);
    }

    getDiseaseVideos(): Observable<any[]> {
        let dataUrl = API_URL + '/disease/video';
        return this.http.get<any[]>(dataUrl);
    }

    getUserInfo(): Observable<Object> {
        let dataUrl = API_URL + '/user/profile';
        return this.http.get<Object>(dataUrl, {headers: this.header});
    }


    getExamItem(): Observable<ExamItem[]> {
        let dataUrl = 'http://115.159.143.108/test/exam-list';
        return this.http.get<ExamItem[]>(dataUrl, {headers: this.header});
    }

    getTestResult(): Observable<TestResult[]> {
        let dataUrl = 'http://115.159.143.108/test/history';
        return this.http.get<TestResult[]>(dataUrl, {headers: this.header});
    }

    getDialogInfo(): Observable<DialogInfo[]> {
        let dataUrl = JSON_URL + '/role-dialog.json';
        return this.http.get<DialogInfo[]>(dataUrl);
    }

    changePw(data): Observable<any> {
        let dataUrl = API_URL + '/user/password_change';
        return this.http.post<any>(dataUrl, data, {headers: this.header});
    }

    getAllExams(): Observable<any> {
        let dataUrl = API_URL + '/test/exam-list';
        console.log(this.header);
        return this.http.get<any>(dataUrl, {headers: this.header});
    }
    
    getOperation(): Observable<Operation[]> {
        let dataUrl = JSON_URL + '/operation.json';
        return this.http.get<Operation[]>(dataUrl);
    }
}

