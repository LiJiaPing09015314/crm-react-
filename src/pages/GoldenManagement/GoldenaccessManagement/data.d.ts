export interface TableListItem {
  key: number;

  id: number;
  name: string;
  Interface: string;
  exchange_rate: number;
  parameter: string;
  status: number;
  author: string;
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
  name?: string;
  Interface?: string;
  exchange_rate?: number;
  parameter?: string;
  status?: number;
  author?: string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
