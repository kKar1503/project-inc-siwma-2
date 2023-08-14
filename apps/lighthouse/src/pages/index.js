import PageCoreVitals from '../components/CoreVitalsReport';

export default function Home({ reportData }) {
  return (
    <div className="dark">
      <PageCoreVitals
        reportData={reportData}
        isLoading={false}
      />
    </div>
  );
}

// This function runs at request time, and its return value populates the `reportData` prop.
export async function getServerSideProps() {
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
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const reportData = data.map((item, index) => ({
      id: index + 1,
      route: item.url,
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

    return { props: { reportData } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { reportData: [] } }; // Return an empty array if fetching fails
  }
}
