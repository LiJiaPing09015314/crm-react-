export interface TableListItem {
  key: number;
  id: number;
  memberid: number;
  account_changeid: number;
  way: string;
  parities: number;
  price: number;
  money: number;
  remark: string;
  author: string;
  creation_time: Date;
  update_time: Date;
  updated: string;
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
  memberid?: number;
  account_changeid?: number;
  way?: string;
  parities?: number;
  price?: number;
  money?: number;
  remark?: string;
  author?: string;
  creation_time?: Date;
  update_time?: Date;
  updated?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
