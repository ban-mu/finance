import React from 'react';
import styles from './styles.module.scss';

const TabOne: React.FC = () => {
  return (
    <div className={styles.tabContent}>
      <h3>Tab 一 内容</h3>
      <p>这是第一个tab对应的组件内容，随便塞点文案。</p>
      <p>这里可以放更多的内容，比如列表、图片、表单等。</p>
      <p>组件高度设置在200-300px之间。</p>
      <p>这是第一个tab特有的内容，与其他tab不同。</p>
    </div>
  );
};

export default TabOne;