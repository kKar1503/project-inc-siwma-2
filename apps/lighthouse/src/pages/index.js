import { useState } from 'react';
import PageCoreVitals from '../components/CoreVitalsReport';

const urls = [
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/archived/chat`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/bookmarks`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/categories`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/category/Hollow%20Sections-1`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/chat`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/compare/1,2,3/CompareDifferences`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/compare/1,2,3`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/compare-listings`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/forgot-password`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/forgot-password/success`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/listings/create`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/listings/edit?id=3`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/change-password`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/c9f22ccc-0e8e-42bd-9388-7f18a5520c26/edit-profile`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/profile/c9f22ccc-0e8e-42bd-9388-7f18a5520c26`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register/success`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/success`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password/c9f22ccc-0e8e-42bd-9388-7f18a5520c26`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/share-function/LyQkFz5Xk000`,
  `${process.env.NEXT_PUBLIC_FRONTEND_URL}/share/LyQkFz5Xk000`,
];

export default function Home({ initialReportData }) {
  const [reportData, setReportData] = useState(initialReportData);
  const [isLoading, setIsLoading] = useState(false);

  const onRescan = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newReportData = data.map((item, index) => ({
        id: index + 1,
        route: item.url,
        categories: {
          Performance: {
            score: item.performanceScore || 0,
            lcp: item.LCP || 0,
            cls: item.CLS || 0,
            fid: item.TBT || 0,
          },
        },
      }));

      setReportData(newReportData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setReportData([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="dark">
      <PageCoreVitals reportData={reportData} isLoading={isLoading} onRescan={onRescan} />
    </div>
  );
}

// This function runs at request time, and its return value populates the `reportData` prop.
export async function getServerSideProps() {
  return { props: {} };
}
