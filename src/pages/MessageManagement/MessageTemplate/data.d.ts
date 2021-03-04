export interface TableListItem {
  key: number;
  id: number,
  title: string,
  type: number,
  operation:  number,
  content: string,
  creator: string;
  creation_time: Date;
  updated: string;
  update_time: Date;
  system_menuid: number;
  status: number;
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
  id?: number,
  title?: string,
  type?: number,
  operation?:  number,
  content?: string,
  creator?: string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  system_menuid?: number;
  status?: number;
}
