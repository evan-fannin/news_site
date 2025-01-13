import React from 'react';
import { Link } from 'react-router-dom';

interface Article {
  id: string;
  headline: string;
  caption: string;
  timestamp: string;
}

const mockArticles: Article[] = [
  {
    id: '1',
    headline: 'Federal Reserve Holds Interest Rates Steady',
    caption: 'Fed signals potential rate cuts later this year as inflation cools',
    timestamp: '2024-03-20T14:30:00Z'
  },
  {
    id: '2',
    headline: 'Tech Sector Leads Market Rally',
    caption: 'AI optimism drives tech stocks to new heights',
    timestamp: '2024-03-20T13:15:00Z'
  },
  {
    id: '3',
    headline: 'Global Trade Growth Exceeds Expectations',
    caption: 'International commerce shows resilience despite challenges',
    timestamp: '2024-03-20T11:45:00Z'
  }
];

const NewsGrid: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Latest Economic News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockArticles.map(article => (
          <Link 
            key={article.id}
            to={`/article/${article.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <article className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.headline}</h2>
              <p className="text-gray-600 mb-4">{article.caption}</p>
              <time className="text-sm text-gray-500">
                {new Date(article.timestamp).toLocaleString()}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
