export interface TableListItem {
  key: number;
  id:number;
  name: string;
  updatedAt: Date;
  userip:number;
  desc: string;

  disabled?: boolean;
  href: string;
  avatar: string; 
  title: string;
  owner: string;
  callNo: number;
  status: number; 
  createdAt: Date;
  progress: number;
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
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
