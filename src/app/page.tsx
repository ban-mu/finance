'use client';
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  // 首页数据在构建时生成，无需客户端状态管理
  const assets = 12345.67;
  const indexTemp = 35.5;

  const kingkongItems = [
    { id: 1, name: "公募基金", icon: "💰", path: "/fund-list" },
    { id: 2, name: "私募基金", icon: "🎯", path: "/" },
    { id: 3, name: "股票", icon: "📈", path: "/" },
    { id: 4, name: "债券", icon: "📊", path: "/" },
    { id: 5, name: "理财", icon: "💎", path: "/" },
    { id: 6, name: "保险", icon: "🛡️", path: "/" },
    { id: 7, name: "定期", icon: "⏰", path: "/" },
    { id: 8, name: "更多", icon: "...", path: "/" },
  ];

  return (
    <div className={styles.container}>
      {/* 我的资产 */}
      <div className={styles.assetSection}>
        <div className={styles.assetHeader}>
          <h2 className={styles.assetTitle}>我的资产</h2>
        </div>
        <div className={styles.assetAmount}>¥{assets.toFixed(2)}</div>
      </div>

      {/* 指数温度 */}
      <div className={styles.tempSection}>
        <div className={styles.tempHeader}>
          <h2 className={styles.tempTitle}>指数温度</h2>
        </div>
        <div className={styles.tempContent}>
          <div className={styles.tempValue}>{indexTemp}°</div>
          <div className={styles.tempDesc}>当前市场处于中等温度区间</div>
        </div>
      </div>

      {/* 金刚区 */}
      <div className={styles.kingkongSection}>
        <div className="kingkong-area">
          {kingkongItems.map((item) => (
            <Link key={item.id} href={item.path} className="kingkong-item">
              <div className="icon">{item.icon}</div>
              <div className="text">{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}