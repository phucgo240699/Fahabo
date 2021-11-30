// Transaction Request
export type CreateTransactionRequestType = {
  familyId?: number;
  type?: string;
  note?: string;
  categoryId?: string;
  occurrences?: number;
  date?: string; // dd-mm-yyyy
  cost?: number;
  photos?: string[];
};

export type UpdateTransactionRequestType = {
  transactionId?: number;
  type?: string;
  date?: string;
  cost?: number;
  categoryName?: string;
  categoryIcon?: string;
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

export type TransactionType = {
  id?: number;
  type?: string;
  date?: string;
  cost?: number;
  categoryName?: string;
  categoryIcon?: string;
};

export type TransactionDetailType = {
  id?: number;
  type?: string;
  note?: string;
  date?: string;
  cost?: number;
  categoryName?: string;
  categoryIcon?: string;
  repeatType?: string;
};

export type TransactionCategoryType = {
  id?: number;
  name?: string;
  icon?: string;
};
