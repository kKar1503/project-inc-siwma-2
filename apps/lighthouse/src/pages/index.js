import PageCoreVitals from '../components/CoreVitalsReport';

export default function Home({ reportData }) {
  return (
    <div className="dark">
      <PageCoreVitals reportData={reportData} isLoading={false} />
    </div>
  );
}

// This function runs at request time, and its return value populates the `reportData` prop.
export async function getServerSideProps() {
  const urls = [
    'http://localhost:3002/',
    'http://localhost:3002/archived/chat',
    'http://localhost:3002/login/',
    'http://localhost:3002/bookmarks',
    'http://localhost:3002/categories',
    // 'http://localhost:3002/category/[cat]'
    'http://localhost:3002/chat',
    // 'http://localhost:3002/compare/[id]/CompareDifferences'
    // 'http://localhost:3002/compare/[id]/index'
    'http://localhost:3002/compare-listings/index',
    'http://localhost:3002/forgot-password/index',
    'http://localhost:3002/forgot-password/success/index',
    'http://localhost:3002/index',
    // 'http://localhost:3002/listings/[action]'
    'http://localhost:3002/profile/change-password',
    // 'http://localhost:3002/profile/[id]/edit-profile'
    // 'http://localhost:3002/profile/[id]'
    'http://localhost:3002/register/index',
    'http://localhost:3002/register/success/index',
    'http://localhost:3002/reset-password/success/index',
    // 'http://localhost:3002/reset-password/[uuid]'
    // 'http://localhost:3002/share/[id]'
    // 'http://localhost:3002/share-function/[id]'
    'http://localhost:3002/test-chat',
    'http://localhost:3002/test-modal',
    'http://localhost:3002/test-notification',
    'http://localhost:3002/test-table',
    // 'http://localhost:3002/_app'
    // 'http://localhost:3002/_document'
  ];

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
    console.log(data);
    const reportData = data.map((item, index) => ({
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

    return { props: { reportData } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { reportData: [] } }; // Return an empty array if fetching fails
  }
}
