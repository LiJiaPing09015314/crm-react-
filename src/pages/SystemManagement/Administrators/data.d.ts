export interface TableListItem {
  id:number;
  title: string;
  username: string;
  password: string;
  key:string;
  creator:string;
  creation_time: Date;
  updated: string;
  update_time: Date;
  ip:string;
  status: number;
  rolelist: any;
  roleid: number;
  system_menuid: number;
  roletitle: string;
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
  id?:number;
  title?: string;
  username?: string;
  password?: string;
  creator?:string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  ip?:string;
  status?: number;
  key?: string;
  roleid?: number;
  rolelist?: any;
  pageSize?: number;
  currentPage?: number;
  system_menuid?: number;
}
