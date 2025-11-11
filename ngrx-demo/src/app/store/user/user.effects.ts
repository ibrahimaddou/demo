import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      switchMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map(user => UserActions.selectUserSuccess({ user })),
          catchError(error => of(UserActions.selectUserFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );

  completeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.completeUser),
      switchMap(({ userId }) =>
        this.userService.completeUser(userId).pipe(
          map(user => UserActions.completeUserSuccess({ user })),
          catchError(error => of(UserActions.completeUserFailure({ 
            error: error.message 
          })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}


