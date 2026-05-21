import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../services';
import { Constants } from 'src/app/shared';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    accessToken: any;
    user: any = null;

    constructor(
        private router: Router,
        private jwtHelper: JwtHelperService,
        private authenticationService: AuthenticationService,
        private constant: Constants,
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem("jwt");

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }

        const isRefreshSuccess = await this.tryRefreshingTokens(token);
        if (!isRefreshSuccess) {
            this.router.navigate(['/auth/dang-nhap'], { queryParams: { returnUrl: state.url } });
        }

        return isRefreshSuccess;
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
                if (data.isStatus) {
                    localStorage.setItem("jwt", data.data.token);
                    localStorage.setItem("refreshToken", data.data.refreshToken);
                    isRefreshSuccess = true;
                }
            }, error => {
                isRefreshSuccess = false;
            }
        );

        return isRefreshSuccess;
    }

}