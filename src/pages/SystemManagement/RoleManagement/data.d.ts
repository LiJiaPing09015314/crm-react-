export interface TableListItem {
  key: number;
  roleid:number;
  disabled?: boolean;
  href: string;
  avatar: string;
  title: string;
  owner: string;
  
  callNo: number;
  status: any;
  updatedAt: Date;
  createdAt: Date;
  progress: number;

  id:number;
  userlist:string;
  name: any;
  desc: string;
  title:string;
  creator:string;
  updated:string;
  text:string;
  update_time:any;
  rolelist:any;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
  system_menuid:number;
  page:number;
  length:number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
  
}

export interface TableListParams {
  sorter?: string;
  status?: any;
  name?: string;
  desc?: string;
  key?: number;
  roleid?:number;
  pageSize?: number;
  currentPage?: number;
  id?:number;
  title?:string;
  creator?:string;
  updated?:string;
  rolelist?:any;
  
  
}
