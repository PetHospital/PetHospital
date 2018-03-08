import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class MissionService {
    private _missionAnnouncedSource = new Subject<any>();
    private _missionConfirmedSource = new Subject<any>();

    public missionAnnounced$ = this._missionAnnouncedSource.asObservable();
    public missionConfirmed$ = this._missionConfirmedSource.asObservable();

    announceMission(mission: any) {
        this._missionAnnouncedSource.next(mission);
    }

    confirmMission(astronaut: any) {
        this._missionConfirmedSource.next(astronaut);
    }
}
