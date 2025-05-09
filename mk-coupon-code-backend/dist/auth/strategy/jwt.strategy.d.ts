import { Strategy } from 'passport-jwt';
import { AuthService } from '../service/auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        name: any;
    }>;
}
export {};
