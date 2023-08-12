import '../styles/globals.css';
import { useEffect, useState, useCallback } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = useCallback(async () => {
    setIsLoading(true);

    // List of URLs to crawl
    const urls = [
      'https://www.reddit.com/',
      'https://www.wikipedia.org/',
      // ... other URLs
    ];

    try {
      const response = await fetch('http://localhost:3001/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }), // Send the URLs in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transforming the data from the server into the reportData format
      const transformedData = data.map((item, index) => ({
        id: index + 1,
        route: item.score, // Assuming "item.score" is the URL (please update if it's stored under another key)
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
      console.log('Transformed Data:', transformedData);
      setReportData(transformedData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
    setIsLoading(false);
  }, []);
  console.log('App rendered');
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
