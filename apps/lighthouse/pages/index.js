import PageCoreVitals from '../components/CoreVitalsReport';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

// eslint-disable-next-line no-unused-vars
export default function App({ Component, pageProps }) {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/crawl');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // TODO: transform data from your backend into reportData format
      setReportData(/* transformed data */);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setIsLoading(false);
  };

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
