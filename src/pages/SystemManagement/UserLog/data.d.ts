export interface TableListItem {
  key: number;
  id: number;
  membertitle: string;
  memberid: number;
  ip: string;
  log: string;
  time: Date;
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
  membertitle?: string;
  memberid?: number;
  ip?: string;
  log?: string;
  time?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
