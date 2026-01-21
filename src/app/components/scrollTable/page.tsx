export default function FundDetail() {
  return (
    <Suspense fallback={<div className={styles.loading}>加载中...</div>}>
      <FundDetailContent />
    </Suspense>
  );
}