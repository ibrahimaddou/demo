import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user/user.state';
import * as UserSelectors from '../../store/user/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedUser$: Observable<User | null>;

  constructor(private store: Store) {
    this.selectedUser$ = this.store.select(UserSelectors.selectSelectedUser);
  }
}


