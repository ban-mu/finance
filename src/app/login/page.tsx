'use client';
import { useState } from 'react';
import styles from './page.module.scss';
import apiClient from '@/lib/axios';
import { authApi } from '@/lib/api';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '3333333@qq.com',
    password: '123456'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password
      });
      console.log('Login success:', response);
      // TODO: Handle login success (e.g., store token, redirect)
    } catch (err) {
      console.error('Login error:', err);
      setError('登录失败，请检查账户密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>登录</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>账户</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="请输入账户"
            />
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label className={styles.label}>密码</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="请输入密码"
            />
          </div>
          
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
}