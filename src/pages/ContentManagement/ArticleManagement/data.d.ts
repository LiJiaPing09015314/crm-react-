export interface TableListItem {
  key: number;
  id: number;
  classifyid: number;
  type: string;
  title: string;
  content: string;
  creator: string;
  creation_time: Date;
  updated: string;
  update_time: Date;

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
  classifyid?: number;
  type?: string;
  title?: string;
  content?: string;
  creator?: string;
  creation_time?: Date;
  updated?: string;
  update_time?: Date;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
