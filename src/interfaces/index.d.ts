/* eslint-disable @typescript-eslint/no-explicit-any */
type ObjectType = { [key: string]: any | any[] };

type GetRequestParams = {
  parentId?: string | number;
  partial?: string | number;
  subId?: string | number;
  action?: string | number;
};
