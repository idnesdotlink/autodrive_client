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

export interface IConfig {
  secure: boolean;
  host: string;
  port: number;
  key: string;
}

export class IDBService extends Dexie {
  members!: Dexie.Table<IMembers, number>;
  users!: Dexie.Table<IUsers, number>;
  preferences!: Dexie.Table<IPreferences, number>;
  config!: Dexie.Table<IConfig, null>;

  constructor() {
    super('AutodriveIDB');
    const Version = this.version(1)
    const schema = {
      members: '++id, name, level, memberId, parentMemberId, phone',
      users: '++id, loginName',
      preferences: '++id, key, value',
      config: 'secure, host, port, key'
    }
    Version.stores(schema);
  }
}
