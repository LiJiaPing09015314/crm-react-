export interface TableListItem {
  key: number;
  indexno: number;
  systemid: number;
  type: string;
  title: string;
  url: string;
  status: number;
  systemtitle:string;
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
  indexno?: number;
  systemtitle?:string;
  systemid?: number;
  id?:number;
  type?: string;
  title?: string;
  url?: string;
  status?: number;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
