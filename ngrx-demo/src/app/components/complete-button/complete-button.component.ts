import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../store/user/user.state';
import { UserActions } from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';

@Component({
  selector: 'app-complete-button',
  templateUrl: './complete-button.component.html',
  styleUrls: ['./complete-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompleteButtonComponent implements OnInit, OnChanges {
  @Input() selectedUser: User | null = null;
  
  loading$: Observable<boolean>;
  previousUserId: number | null = null;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  }

  ngOnInit(): void {
    console.log('CompleteButtonComponent - ngOnInit appelé');
    console.log('Utilisateur initial:', this.selectedUser);
    
    if (this.selectedUser) {
      this.previousUserId = this.selectedUser.id;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CompleteButtonComponent - ngOnChanges appelé');
    console.log('Changements détectés:', changes);
    
    // Détecter quand l'utilisateur sélectionné change
    if (changes['selectedUser']) {
      const currentUser = changes['selectedUser'].currentValue;
      const previousUser = changes['selectedUser'].previousValue;
      
      console.log('Utilisateur précédent:', previousUser);
      console.log('Utilisateur actuel:', currentUser);
      
      // Vérifier si l'utilisateur a vraiment changé
      if (previousUser !== currentUser) {
        if (previousUser && currentUser) {
          if (previousUser.id !== currentUser.id) {
            console.log(`Utilisateur changé: ${previousUser.id} -> ${currentUser.id}`);
            this.previousUserId = previousUser.id;
            this.onUserChanged(currentUser, previousUser);
          }
        } else if (!previousUser && currentUser) {
          console.log('Nouvel utilisateur sélectionné:', currentUser.id);
          this.onUserChanged(currentUser, null);
        } else if (previousUser && !currentUser) {
          console.log('Utilisateur désélectionné');
          this.onUserChanged(null, previousUser);
        }
      }
      
      // Marquer pour la détection de changement (nécessaire avec OnPush)
      this.cdr.markForCheck();
    }
  }

  private onUserChanged(newUser: User | null, oldUser: User | null): void {
    // Cette fonction est appelée chaque fois que l'utilisateur change
    console.log('onUserChanged appelé');
    console.log('Ancien utilisateur:', oldUser);
    console.log('Nouvel utilisateur:', newUser);
    
    // Ici vous pouvez ajouter toute logique nécessaire quand l'utilisateur change
    // Par exemple: réinitialiser des états, charger des données, etc.
  }

  onCompleteUser(userId: number): void {
    this.store.dispatch(UserActions.completeUser({ userId, status: 'completed' }));
  }
}


