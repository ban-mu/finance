'use client';
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.scss";
import mockData from "./mock.json";
import type { MockData } from "./type";

const data = mockData as MockData;

export default function FundList() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    "全部",
    "股票型",
    "混合型",
    "债券型",
    "指数型",
    "货币型",
    "QDII",
  ];

  const fundList = data.resultData.prdtNavList.map((item) => ({
    id: item.prdtId,
    name: item.prdtAbbr || item.prdtName,
    code: item.prdtCode,
    nav: item.unitNav,
    change: item.changeRate.replace("%", ""),
    riskLevel: item.riskLevel,
    rateMonth1: item.rateMonth1,
    rateMonth3: item.rateMonth3,
    rateYear1: item.rateYear1,
  }));

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <div className="header">
        <Link href="/" className="back-btn">←</Link>
        <h1>基金列表</h1>
      </div>

      {/* 基金分类 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryScroll}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${styles.categoryItem} ${activeCategory === index ? styles.active : ""}`}
              onClick={() => setActiveCategory(index)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* 基金列表 */}
      <div className="fund-list">
        {fundList.map((fund) => (
          <Link key={fund.id} href={`/fund-detail?id=${fund.id}`} className="fund-item">
            <div className="fund-info">
              <div className="fund-name">{fund.name}</div>
              <div className="fund-code">{fund.code}</div>
            </div>
            <div className="fund-performance">
              <div className="nav">¥{fund.nav}</div>
              <div className={`change ${parseFloat(fund.change) >= 0 ? "positive" : "negative"}`}>
                {parseFloat(fund.change) >= 0 ? "+" : ""}{fund.change}%
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}