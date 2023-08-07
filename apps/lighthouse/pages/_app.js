import '../styles/globals.css';
import { useEffect, useState, useCallback } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/crawl');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // check if data is an array, if not, make it an array
      const dataArray = Array.isArray(data) ? data : [data];

      // Transforming the data from the server into the reportData format
      const transformedData = dataArray.map((item) => ({
        id: item.id,
        route: item.route,
        categories: {
          Performance: {
            score: item.performanceScore,
            lcp: item.LCP,
            cls: item.CLS,
            fid: item.TBT,
          },
          SEO: { score: 0 },
          PWA: { score: 0 },
        },
      }));

      setReportData(transformedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // Here, we're passing reportData and other functions down to the
  // page component as props
  return (
    <Component
      {...pageProps}
      reportData={reportData}
      isLoading={isLoading}
      fetchReportData={fetchReportData}
    />
  );
}
