import Dexie from 'dexie';

export interface IMembers {
  id?: number;
  name?: string;
  level?: number;
  phone?: number;
  parentMemberId?: string;
  memberId?: string;
}

export interface IPreferences {
  id?: number;
  key?:string;
  value?: any;
}

export interface IUsers {
  id?: number;
  loginName?: string
}

export class IDBService extends Dexie {
  members!: Dexie.Table<IMembers, number>;
  users!: Dexie.Table<IUsers, number>;

  constructor() {
    super('AutodriveIDB');
    this.version(1).stores({
      members: '++id, name, level, memberId, parentMemberId, phone',
      users: '++id, loginName',
      preferences: '++id, key, value'
    });
  }
}
