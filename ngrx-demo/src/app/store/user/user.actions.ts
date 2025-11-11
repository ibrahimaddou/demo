import { createAction, props } from '@ngrx/store';
import { User } from './user.state';

// Load Users
export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Select User
export const selectUser = createAction(
  '[User] Select User',
  props<{ userId: number }>()
);

export const selectUserSuccess = createAction(
  '[User] Select User Success',
  props<{ user: User }>()
);

export const selectUserFailure = createAction(
  '[User] Select User Failure',
  props<{ error: string }>()
);

// Complete User
export const completeUser = createAction(
  '[User] Complete User',
  props<{ userId: number }>()
);

export const completeUserSuccess = createAction(
  '[User] Complete User Success',
  props<{ user: User }>()
);

export const completeUserFailure = createAction(
  '[User] Complete User Failure',
  props<{ error: string }>()
);


