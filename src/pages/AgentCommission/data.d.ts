export interface TableListItem {
  key: number;
  id: number;
  memberid: number;
  ordersid: number;
  memberids: number;
  account_changeid: number;
  price: number;
  brokerage: number;
  creation_time: Date;
  updated: string;
  update_time: Date;
  creator: string;
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
  ordersid?: number;
  memberids?: number;
  account_changeid?: number;
  price?: number;
  brokerage?: number;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  creator?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
