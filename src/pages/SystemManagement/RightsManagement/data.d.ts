export interface TableListItem {
  key: number;
  id: number;
  title: string;
  system_menutitle: string;
  url: string;
  nodelist: any;
  roleid: number;
  indexno: number;
  system_menuid: number;
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
  key?: number;
  roleid?: number;
  nodelist?: any;
  id?: number;
  title?: string;
  url?: string;
  indexno?: number;
  system_menuid?: number;
}
