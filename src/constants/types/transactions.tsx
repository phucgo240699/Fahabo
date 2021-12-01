// Transaction Request
export type CreateTransactionRequestType = {
  familyId?: number;
  type?: string;
  note?: string;
  categoryId?: number;
  repeatType?: string;
  date?: string; // dd-mm-yyyy
  cost?: number;
  photos?: (string | undefined)[]; // base64 string
};

export type UpdateTransactionRequestType = {
  transactionId?: number;
  type?: string;
  note?: string;
  date?: string;
  categoryId?: number;
  repeatType?: string;
  cost?: number;
  photos?: (string | undefined)[];
  deletePhotos?: number[];
};

export type DeleteTransactionRequestType = {
  transactionId?: number;
  deleteAll?: boolean;
};

export type GetTransactionsRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  searchText?: string;
  from?: string;
  to?: string;
  page?: number;
  size?: number;
};

export type GetTransactionPhotosRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  transactionId?: number;
  page?: number;
  size?: number;
};

export type GetTransactionDetailRequestType = {
  transactionId?: number;
};

// Category Request
export type CreateTransactionCategoryRequestType = {
  familyId?: number;
  name?: string;
  icon?: string;
  type?: string;
};

export type GetTransactionCategoriesRequestType = {
  showHUD?: boolean;
  getting?: boolean;
  refresh?: boolean;
  loadMore?: boolean;
  familyId?: number;
  type?: string;
  page?: number;
  size?: number;
};

export type DeleteTransactionCategoryRequestType = {
  categoryId?: number;
  type?: string;
};

export type TransactionType = {
  id?: number;
  type?: string;
  date?: string;
  note?: string;
  repeatType?: string;
  cost?: number;
  category?: TransactionCategoryType;
};

export type TransactionCategoryType = {
  id?: number;
  title?: string;
  icon?: string;
  translated?: boolean;
  type?: string;
};

export enum TransactionCategorySegment {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}
