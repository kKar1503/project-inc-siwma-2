import PageCoreVitals from '../components/CoreVitalsReport';

export default function Home({ reportData, isLoading, fetchReportData }) {
  const handleRescan = async () => {
    fetchReportData();
  };

  return (
    <div className='dark'>
      <PageCoreVitals
        reportData={reportData}
        onRescan={handleRescan}
        isLoading={isLoading}
      />
    </div>
  );
}