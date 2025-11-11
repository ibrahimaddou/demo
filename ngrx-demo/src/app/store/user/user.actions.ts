import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.state';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Select User': props<{ userId: number }>(),
    'Select User Success': props<{ user: User }>(),
    'Select User Failure': props<{ error: string }>(),

    'Complete User': props<{ userId: number; status: User['status'] }>(),
    'Complete User Success': props<{ user: User }>(),
    'Complete User Failure': props<{ error: string }>(),
  },
});


