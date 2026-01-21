'use client';
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";

// 动态导入ECharts组件，实现懒加载
const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <div className={styles.chartLoading}>加载图表中...</div>,
});

// 包裹组件，处理useSearchParams的Suspense要求
function FundDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [fundData, setFundData] = useState<any>(null);

  useEffect(() => {
    // 模拟加载基金详情数据
    const loadFundData = () => {
      const mockData = {
        id: parseInt(id),
        name: "易方达蓝筹精选混合",
        code: "005827",
        nav: 1.8567,
        change: 2.34,
        manager: "张坤",
        trendData: {
          dates: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07"],
          values: [1.80, 1.82, 1.78, 1.81, 1.83, 1.84, 1.86],
        },
        performance: [
          { period: "近1周", return: 3.24 },
          { period: "近1月", return: 8.56 },
          { period: "近3月", return: 15.23 },
          { period: "近6月", return: 22.45 },
          { period: "近1年", return: 35.67 },
          { period: "成立以来", return: 85.67 },
        ],
        档案: {
          type: "混合型",
          risk: "中高风险",
          成立日期: "2018-09-05",
          规模: "89.56亿",
          manager: "张坤",
          company: "易方达基金管理有限公司",
        },
        holdings: [
          { name: "贵州茅台", ratio: 9.87 },
          { name: "腾讯控股", ratio: 9.56 },
          { name: "五粮液", ratio: 8.76 },
          { name: "招商银行", ratio: 7.65 },
          { name: "泸州老窖", ratio: 6.54 },
        ],
        rules: {
          purchase: "10元起购",
          redemption: "T+3到账",
          fee: "申购费1.5%（优惠1折），赎回费0.5%（持有满1年免赎回费）",
        },
      };
      setFundData(mockData);
    };

    if (id) {
      loadFundData();
    }
  }, [id]);

  if (!id) {
    return <div className={styles.loading}>请选择要查看的基金</div>;
  }

  if (!fundData) {
    return <div className={styles.loading}>加载中...</div>;
  }

  // 配置折线图
  const chartOption = {
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: fundData.trendData.dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "单位净值",
        type: "line",
        data: fundData.trendData.values,
        smooth: true,
        itemStyle: {
          color: "#1890ff",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(24, 144, 255, 0.3)" },
              { offset: 1, color: "rgba(24, 144, 255, 0.05)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <div className="header">
        <Link href="/fund-list" className="back-btn">←</Link>
        <h1>基金详情</h1>
      </div>

      {/* 基金基本信息 */}
      <div className="fund-detail-header">
        <div className="fund-name">{fundData.name} ({fundData.code})</div>
        <div className={`fund-change ${fundData.change >= 0 ? "positive" : "negative"}`}>
          {fundData.change >= 0 ? "+" : ""}{fundData.change}%
        </div>
        <div className="fund-nav">单位净值: ¥{fundData.nav}</div>
      </div>

      {/* 基金经理 */}
      <div className="fund-section">
        <div className="section-title">基金经理</div>
        <div className={styles.managerInfo}>{fundData.manager}</div>
      </div>

      {/* 收益走势折线图 */}
      <div className="fund-section">
        <div className="section-title">收益走势</div>
        <div className={styles.chartContainer}>
          <ReactECharts option={chartOption} style={{ height: "300px", width: "100%" }} />
        </div>
      </div>

      {/* 历史业绩 */}
      <div className="fund-section">
        <div className="section-title">历史业绩</div>
        <div className={styles.performanceTable}>
          {fundData.performance.map((item: any, index: number) => (
            <div key={index} className={styles.performanceItem}>
              <div className={styles.performancePeriod}>{item.period}</div>
              <div className={`${styles.performanceReturn} ${item.return >= 0 ? "positive" : "negative"}`}>
                {item.return >= 0 ? "+" : ""}{item.return}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 基金档案 */}
      <div className="fund-section">
        <div className="section-title">基金档案</div>
        <div className={styles.archiveContent}>
          <div className={styles.archiveItem}>
            <span className={styles.archiveLabel}>基金类型:</span>
            <span className={styles.archiveValue}>{fundData.档案.type}</span>
          </div>
          <div className={styles.archiveItem}>
            <span className={styles.archiveLabel}>风险等级:</span>
            <span className={styles.archiveValue}>{fundData.档案.risk}</span>
          </div>
          <div className={styles.archiveItem}>
            <span className={styles.archiveLabel}>成立日期:</span>
            <span className={styles.archiveValue}>{fundData.档案.成立日期}</span>
          </div>
          <div className={styles.archiveItem}>
            <span className={styles.archiveLabel}>基金规模:</span>
            <span className={styles.archiveValue}>{fundData.档案.规模}</span>
          </div>
          <div className={styles.archiveItem}>
            <span className={styles.archiveLabel}>基金公司:</span>
            <span className={styles.archiveValue}>{fundData.档案.company}</span>
          </div>
        </div>
      </div>

      {/* 基金持仓 */}
      <div className="fund-section">
        <div className="section-title">基金持仓</div>
        <div className={styles.holdingsContent}>
          {fundData.holdings.map((item: any, index: number) => (
            <div key={index} className={styles.holdingItem}>
              <div className={styles.holdingName}>{item.name}</div>
              <div className={styles.holdingRatio}>{item.ratio}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 交易规则 */}
      <div className="fund-section">
        <div className="section-title">交易规则</div>
        <div className={styles.rulesContent}>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>申购起点:</span>
            <span className={styles.ruleValue}>{fundData.rules.purchase}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>赎回到账:</span>
            <span className={styles.ruleValue}>{fundData.rules.redemption}</span>
          </div>
          <div className={styles.ruleItem}>
            <span className={styles.ruleLabel}>费率规则:</span>
            <span className={styles.ruleValue}>{fundData.rules.fee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 主页面组件，使用Suspense包裹
export default function FundDetail() {
  return (
    <Suspense fallback={<div className={styles.loading}>加载中...</div>}>
      <FundDetailContent />
    </Suspense>
  );
}