import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user/user.state';
import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUser$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onSelectUser(userId: number): void {
    this.store.dispatch(UserActions.selectUser({ userId }));
  }
}


