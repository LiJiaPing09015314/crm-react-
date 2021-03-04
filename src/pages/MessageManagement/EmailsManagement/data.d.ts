export interface TableListItem {
  key: number;

  id: number;
  smtp: string;
  port: number;
  status: number;
  username: string;
  password: number;
  name: string;
  system_menuid: number;
  email: string;
  creator: string;
  creation_time: Date;
  updated: string;
  update_time: Date;
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
  pageSize?: number;
  currentPage?: number;

  id?: number;
  smtp?: string;
  port?: number;
  system_menuid?: number;
  status?: number;
  username?: string;
  password?: number;
  name?: string;
  email?: string;
  creator?: string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
}
