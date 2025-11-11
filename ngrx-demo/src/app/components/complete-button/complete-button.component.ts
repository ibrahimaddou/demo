import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user/user.state';
import { UserActions } from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';

@Component({
  selector: 'app-complete-button',
  templateUrl: './complete-button.component.html',
  styleUrls: ['./complete-button.component.css']
})
export class CompleteButtonComponent {
  selectedUser$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  }

  onCompleteUser(userId: number): void {
    this.store.dispatch(UserActions.completeUser({ userId, status: 'completed' }));
  }
}


