'use client';
import React, { useState } from 'react';
import styles from './page.module.scss';
import TabOne from './components/TabOne';
import TabTwo from './components/TabTwo';
import TabThree from './components/TabThree';

const DemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('一');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // React的动态组件实现
  const renderTabContent = () => {
    switch (activeTab) {
      case '一':
        return <TabOne />;
      case '二':
        return <TabTwo />;
      case '三':
        return <TabThree />;
      default:
        return <TabOne />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === '一' ? styles.active : ''}`}
          onClick={() => handleTabClick('一')}
        >
          一
        </button>
        <button 
          className={`${styles.tab} ${activeTab === '二' ? styles.active : ''}`}
          onClick={() => handleTabClick('二')}
        >
          二
        </button>
        <button 
          className={`${styles.tab} ${activeTab === '三' ? styles.active : ''}`}
          onClick={() => handleTabClick('三')}
        >
          三
        </button>
      </div>
      <div className={styles.content}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DemoPage;
