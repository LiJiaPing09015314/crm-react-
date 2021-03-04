export interface TableListItem {
  key: number;
  id: number;
  name: string;
  password: number;
  username: string;
  email: string;
  status: number;
  memberid: number;
  price: number;
  creator: string;
  creation_time: Date;
  redate: number;
  path: string;
  systemid: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  key?: number;
  redate?: number;
  id?: number;
  systemid?: number;
  name?: string;
  password?: number;
  path?: string;
  username?: string;
  email?: string;
  status?: number;
  memberid?: number;
  price?: number;
  creator?: string;
  creation_time?: Date;
}
