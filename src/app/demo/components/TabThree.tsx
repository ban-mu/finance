import React from 'react';
import styles from './styles.module.scss';

const TabThree: React.FC = () => {
  return (
    <div className={styles.tabContent}>
      <h3>Tab 三 内容</h3>
      <p>这是第三个tab对应的组件内容，与前两个都不同。</p>
      <p>这里可以放一些特殊的内容，比如表格、视频等。</p>
      <p>组件高度设置在200-300px之间。</p>
      <p>这是第三个tab特有的内容，与其他tab不同。</p>
      <p>可以添加更多的段落来测试滚动效果。</p>
      <p>这里是额外的内容，确保组件高度达到要求。</p>
    </div>
  );
};

export default TabThree;