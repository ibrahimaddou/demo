import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from './user.state';
import { UserActions } from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Select User
  on(UserActions.selectUser, (state) => ({
    ...state,
    loading: true
  })),
  
  on(UserActions.selectUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false
  })),
  
  on(UserActions.selectUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Complete User
  on(UserActions.completeUser, (state) => ({
    ...state,
    loading: true
  })),
  
  on(UserActions.completeUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    loading: false
  })),
  
  on(UserActions.completeUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);


