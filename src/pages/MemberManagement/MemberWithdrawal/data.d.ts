export interface TableListItem {
  key: number;
  title: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
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
  updatedAt?: Date;
  status?: number;
  title?: string;
  callNo?: number;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
