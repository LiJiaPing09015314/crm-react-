export interface TableListItem {
  key: number;
  id: number;
  type: number;
  username: string;
  operation:  number;
  content: string;
  status: number;
  foundtime: Date;
  sendtime: Date;
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
  type?: number;
  username?: string;
  operation?:  number;
  content?: string;
  status?: number;
  foundtime?: Date;
  sendtime?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
