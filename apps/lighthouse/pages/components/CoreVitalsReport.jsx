import React, { useState, useEffect } from 'react';
import ScoreDoughnut from './ScoreDoughnut';

const CoreVitalsReport = ({ onRescan }) => {
  const [selectedCategory, setSelectedCategory] = useState('Overview');
  const [reportData, setReportData] = useState([]);
  const categories = [
    'Overview',
    'Performance',
    'Accessibility',
    'Best Practices',
  ];

  useEffect(() => {
    fetch('http://localhost:3001/crawl')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const transformedData = [
          {
            id: 1,
            route: '/.wikipedia.org/', // Replace with actual route
            categories: {
              Performance: {
                score: data.performanceScore,
                lcp: data.LCP,
                cls: data.CLS,
                fid: data.TBT,
              },
              SEO: { score: 0 },
              PWA: { score: 0 },
            },
          }
        ];

        setReportData(transformedData);
        console.log(reportData);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const getCategoryColumns = (category) => {
    if (
      !reportData ||
      reportData.length === 0 ||
      !reportData[0].categories[category]
    ) {
      return ['Route'];
    }

    const categoryKeys = Object.keys(reportData[0].categories[category]);
    return category === 'Overview'
      ? ['Route', 'Score']
      : ['Route', ...categoryKeys];
  };

  const getCategoryData = (routeData, category) => {
    if (category === 'Overview') {
      const doughnuts = categories.slice(1).map((cat) => {
        if (routeData.categories[cat]) {
          return (
            <div className='mr-2' style={{ flex: '0 0 auto' }}>
              <ScoreDoughnut
                key={cat}
                score={routeData.categories[cat].score}
                category={cat}
              />
            </div>
          );
        }
        return null;
      });

      const overviewData = [
        routeData.route,
        <div className='flex'>{doughnuts}</div>,
      ];

      return overviewData;
    }

    return getCategoryColumns(category).map((column) => {
      if (column === 'Route') {
        return routeData.route;
      }

      if (column === 'score') {
        return (
          <ScoreDoughnut
            score={routeData.categories[category][column]}
            category={category}
          />
        );
      }

      return routeData.categories[category][column];
    });
  };

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-sans bg-gray-800 text-white h-full'>
      <h1 className='pt-4 text-2xl font-semibold'>Core Web Vitals Report</h1>

      <div className='mt-4 grid grid-cols-5 gap-4 h-full'>
        <div className='col-span-1 bg-gray-700 rounded-md p-0'>
          <div className='p-4'>
            {categories.map((category) => (
              <button
                key={category}
                className={`block w-full text-left py-2 px-4 rounded ${selectedCategory === category ? 'bg-gray-600' : ''
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className='col-span-4 bg-gray-700 rounded-md p-0'>
          <div className='p-4'>
            <h2 className='text-lg font-medium'>{selectedCategory} Report</h2>
            <div className='overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700'>
              <table className='mt-2 w-full'>
                <thead>
                  <tr>
                    {getCategoryColumns(selectedCategory).map((column) => (
                      <th key={column} className='text-left py-2 px-4'>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((routeData) => (
                    <tr key={routeData.id}>
                      {getCategoryData(routeData, selectedCategory).map(
                        (data, index) => (
                          <td key={index} className='py-2 px-4'>
                            {data}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
              onClick={onRescan}
            >
              Rescan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreVitalsReport;
