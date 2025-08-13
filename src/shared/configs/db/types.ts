export interface IStore {
  name: string;
  options?: IDBObjectStoreParameters;
  indexes?: {
    name: string;
    keyPath: string | string[];
    options?: IDBIndexParameters;
  }[];
}

export type MigrationType = (
  db: IDBDatabase,
  tx: IDBTransaction,
  oldVersion: number
) => void;
