import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { AUTHENTICATION_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class JwtAuthenticationRouteGuard implements CanActivate {
    constructor(
        @Inject(AUTHENTICATION_SERVICE)
        private readonly authenticationClient: ClientProxy
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

        if (!jwt) {
            return false;
        }

        return this.authenticationClient
            .send<UserDto>('authenticate', {
                Authentication: jwt,
            })
            .pipe(
                tap(
                    (response: UserDto) =>
                        (context.switchToHttp().getRequest().user = response)
                ),
                map(() => true)
            );
    }
}
