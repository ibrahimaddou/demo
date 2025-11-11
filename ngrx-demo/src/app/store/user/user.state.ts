export interface User {
  id: number;
  name: string;
  email: string;
  status: 'in-progress' | 'completed';
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null
};


