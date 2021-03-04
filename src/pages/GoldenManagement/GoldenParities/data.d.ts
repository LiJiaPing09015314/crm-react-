export interface TableListItem {
  key: number;
  type: string;
  rate: number;
  status: number;
  id: number;
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
  type?: string;
  rate?: number;
  status?: number;
  id?: number;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
