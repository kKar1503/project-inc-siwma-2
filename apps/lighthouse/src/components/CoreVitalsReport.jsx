import React, { useState } from 'react';
import ScoreDoughnut from './ScoreDoughnut';
import LoadingSpinner from './LoadingSpinner';

const CoreVitalsReport = ({ onRescan, reportData = [], isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState('Overview');
  const categories = ['Overview', 'Performance', 'What is Lighthouse?'];

  const LighthouseDescription = () => (
    <div className="space-y-4 h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-semibold mb-2">Understanding Lighthouse</h3>
      <p className="text-lg">
        Lighthouse is not just another tool; it's your companion in enhancing web page quality. With
        its automated capabilities, you get insights across multiple dimensions.
      </p>

      <h4 className="text-xl font-medium mb-2">Key Metrics at a Glance:</h4>
      <ul className="list-decimal pl-5 space-y-2">
        <li className="text-lg">
          <strong>CLS (Cumulative Layout Shift):</strong> Ever noticed the annoying jumps in a
          webpage? That's layout shift. CLS captures this experience, scoring lower for minimal
          shifts. Essentially, the less you irritate your user, the better your score!
        </li>
        <li className="text-lg">
          <strong>LCP (Largest Contentful Paint):</strong> Think of LCP as a timer that stops when
          the main content of your page becomes visible. It's a telling sign of how quickly your
          users can actually start consuming the content they came for.
        </li>
        <li className="text-lg">
          <strong>FID (First Input Delay):</strong> FID is all about responsiveness. It measures the
          gap between your user's first interaction and when the browser responds to it. A short
          delay? Your users will love you for it.
        </li>
      </ul>
    </div>
  );

  const getCategoryColumns = (category) => {
    if (!reportData || reportData.length === 0 || !reportData[0].categories[category]) {
      return [];
    }

    const categoryKeys = Object.keys(reportData[0].categories[category]);
    return category === 'Overview' ? ['Score'] : ['Route', ...categoryKeys];
  };

  const computeAverageScore = () => {
    if (!reportData || reportData.length === 0) return 0;
    const totalScore = reportData.reduce((acc, routeData) => {
      return (
        acc + (routeData.categories['Performance'] ? routeData.categories['Performance'].score : 0)
      );
    }, 0);
    return Math.round(totalScore / reportData.length);
  };

  const getCategoryData = (category) => {
    if (category === 'Overview') {
      const averageScore = computeAverageScore();
      const doughnut = (
        <div className="mr-2" style={{ flex: '0 0 auto' }}>
          <ScoreDoughnut score={averageScore} category="Performance" />
        </div>
      );
      return [
        <div className="flex" key={0}>
          {doughnut}
        </div>,
      ];
    }
    return reportData.map((routeData) => {
      return getCategoryColumns(category).map((column, index) => {
        if (column === 'Route') {
          return routeData.route;
        }
        if (column === 'score') {
          return (
            <ScoreDoughnut
              score={routeData.categories[category][column]}
              category={category}
              key={routeData.route + column + index}
            />
          );
        }
        return routeData.categories[category][column];
      });
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full flex flex-col flex-grow mx-auto px-4 sm:px-6 font-sans bg-gray-800 text-white">
      <h1 className="pt-4 text-2xl font-semibold">Core Web Vitals Report</h1>

      <div className="mt-4 grid grid-cols-5 gap-4 h-full pb-4">
        <div className="col-span-1 bg-gray-700 rounded-md p-0">
          <div className="p-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`block w-full text-left py-2 px-4 rounded ${
                  selectedCategory === category ? 'bg-gray-600' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-4 bg-gray-700 rounded-md p-0">
          <div className="p-4">
            {selectedCategory !== 'Lighthouse' && (
              <h2 className="text-lg font-medium">{selectedCategory} Report</h2>
            )}
            {selectedCategory === 'Lighthouse' ? (
              <LighthouseDescription />
            ) : (
              <div className="relative overflow-x-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                <div className="custom-scroll overflow-y-scroll h-[calc(100vh-200px)]">
                  <table className="mt-2 w-full">
                    <thead>
                      <tr>
                        {getCategoryColumns(selectedCategory).map((column) => (
                          <th
                            key={column}
                            className="text-left py-2 px-4 sticky top-0 bg-gray-700 z-10"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* If the selected category is 'Overview', show the single average doughnut. Otherwise, show the route data */}
                      {selectedCategory === 'Overview' ? (
                        <tr>
                          {getCategoryData(selectedCategory).map((data, index) => (
                            <td key={index} className="py-2 px-4">
                              {data}
                            </td>
                          ))}
                        </tr>
                      ) : (
                        reportData &&
                        reportData.map((routeData, routeIndex) => (
                          <tr key={routeData.id}>
                            {getCategoryData(selectedCategory)[routeIndex].map((data, index) => (
                              <td key={index} className="py-2 px-4">
                                {data}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {selectedCategory !== 'Lighthouse' && (
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onRescan}>
                Rescan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreVitalsReport;
