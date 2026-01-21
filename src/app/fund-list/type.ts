export interface FundItem {
  prdtId: number;
  prdtCode: string;
  prdtName: string;
  prdtAbbr: string;
  unitNav: string;
  changeRate: string;
  riskLevel: number;
  rateMonth1: string;
  rateMonth3: string;
  rateYear1: string;
}

export interface MockData {
  code: string;
  msg: string;
  resultData: {
    prdtNavList: FundItem[];
    imageUrl: string;
    totalRecords: number;
  };
}
