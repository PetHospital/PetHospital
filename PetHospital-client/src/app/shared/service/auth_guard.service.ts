import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate() {
        let arr, reg = new RegExp("(^| )token=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return true;
        } else {
            alert('Please login first!!!');
            return false;
        }
    }
}
