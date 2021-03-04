export interface TableListItem {
  key: number;
  system_menuid: number;
  id: number;
  price: number;
  status: number;
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
  id?: number;
  price?: number;
  status?: number;
  creator?: string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  system_menuid?: number;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
