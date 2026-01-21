'use client';
import React, { useState, useEffect } from 'react';

interface ComponentNameProps {
  initValue: string;
}

const ComponentName: React.FC<ComponentNameProps> = ({ initValue }) => {
  // 状态管理
  const [value, setValue] = useState<string>(initValue);

  // 生命周期/副作用
  useEffect(() => {
    console.log('组件挂载/initValue变化:', initValue);
    return () => {
      console.log('组件卸载');
    };
  }, [initValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="container">
      <input type="text" value={value} onChange={handleChange} />
      <p>当前值：{value}</p>
      
    </div>
  );
};

export default ComponentName;
