export interface TableListItem {
  key: number;
  id: number;
  memberid: number;
  gameid: number;
  price: number;
  out: number;
  outs: number;
  profit: number;
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
  memberid?: number;
  gameid?: number;
  price?: number;
  out?: number;
  outs?: number;
  profit?: number;
  time?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
