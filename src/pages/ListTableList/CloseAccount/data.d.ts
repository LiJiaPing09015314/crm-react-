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
  path: string;
  rebate: number;
  path: string;
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
  id?: number;
  name?: string;
  password?: number;
  username?: string;
  email?: string;
  path?: string;
  status?: number;
  memberid?: number;
  price?: number;
  creator?: string;
  creation_time?: Date;
  rebate?: number;
  path?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
