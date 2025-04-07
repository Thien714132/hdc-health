interface FolderItem {
  id: string;
  userId: string;
  name: string;
  createdDate: string;
  numberOfNote: number;
  isAll: boolean;
  notes?: NoteItem[];
}

interface GetFoldersParams {
  after: string;
  size: number;
}

interface GetFolderResponse {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  data: FolderItem[];
  hasNext: boolean;
  isLast: boolean;
  lastId: string;
}
