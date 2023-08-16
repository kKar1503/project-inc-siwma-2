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
    `${process.env.FRONTEND_URL}/`,
    `${process.env.FRONTEND_URL}/archived/chat`,
    `${process.env.FRONTEND_URL}/login/`,
    `${process.env.FRONTEND_URL}/bookmarks`,
    `${process.env.FRONTEND_URL}/categories`,
    // `${process.env.FRONTEND_URL}/category/[cat]`
    `${process.env.FRONTEND_URL}/chat`,
    // `${process.env.FRONTEND_URL}/compare/[id]/CompareDifferences`
    // `${process.env.FRONTEND_URL}/compare/[id]/index`
    `${process.env.FRONTEND_URL}/compare-listings/index`,
    `${process.env.FRONTEND_URL}/forgot-password/index`,
    `${process.env.FRONTEND_URL}/forgot-password/success/index`,
    `${process.env.FRONTEND_URL}/index`,
    // `${process.env.FRONTEND_URL}/listings/[action]`
    `${process.env.FRONTEND_URL}/profile/change-password`,
    // `${process.env.FRONTEND_URL}/profile/[id]/edit-profile`
    // `${process.env.FRONTEND_URL}/profile/[id]`
    `${process.env.FRONTEND_URL}/register/index`,
    `${process.env.FRONTEND_URL}/register/success/index`,
    `${process.env.FRONTEND_URL}/reset-password/success/index`,
    // `${process.env.FRONTEND_URL}/reset-password/[uuid]`
    // `${process.env.FRONTEND_URL}/share/[id]`
    // `${process.env.FRONTEND_URL}/share-function/[id]`
    `${process.env.FRONTEND_URL}/test-chat`,
    `${process.env.FRONTEND_URL}/test-modal`,
    `${process.env.FRONTEND_URL}/test-notification`,
    `${process.env.FRONTEND_URL}/test-table`,
    // `${process.env.FRONTEND_URL}/_app`
    // `${process.env.FRONTEND_URL}/_document`
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
