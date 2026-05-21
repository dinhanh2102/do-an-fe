import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../services';
import { Constants } from 'src/app/shared';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private jwtHelper: JwtHelperService,
        private authenticationService: AuthenticationService,
        private constant: Constants,
    ) { }

    private _inProgressCount = 0;
    @BlockUI() blockUI!: NgBlockUI;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = localStorage.getItem('jwt');

        // if (this.jwtHelper.isTokenExpired(token)) {
        //    this.tryRefreshingTokens(token);
        // }

        var noLoad = request.headers.get('no-load');
        if (noLoad != 'false') {
            if (this._inProgressCount <= 0) {
                this.blockUI.start();
            }
            this._inProgressCount++;
        }

        
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }

        return next.handle(request).pipe(finalize(() => {
            if (noLoad != 'false') {
                this._inProgressCount--;
                if (this._inProgressCount === 0) {
                    this.blockUI.stop();
                }
            }
        }));
    }

    public async tryRefreshingTokens(token: string): Promise<boolean> {
        // Try refreshing tokens using refresh token
        const refreshToken: string = localStorage.getItem("refreshToken");
        if (!token || !refreshToken) {
            return false;
        }

        const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
        let isRefreshSuccess: boolean;

        this.authenticationService.refreshtoken(credentials).subscribe(
            (data: any) => {
                if (data.statusCode == this.constant.StatusCode.Success) {
                    localStorage.setItem("jwt", data.data.token);
                    localStorage.setItem("refreshToken", data.data.refreshToken);
                    isRefreshSuccess = true;
                }
                else {
                    isRefreshSuccess = false;
                }
            }, error => {
                isRefreshSuccess = false;
            }
        );

        return isRefreshSuccess;
    }
}