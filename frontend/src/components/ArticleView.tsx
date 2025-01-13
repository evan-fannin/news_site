import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Article {
  id: string;
  headline: string;
  caption: string;
  content: string;
  timestamp: string;
}

type ArticlesRecord = Record<string, Article>;

const mockArticles: ArticlesRecord = {
  '1': {
    id: '1',
    headline: 'Federal Reserve Holds Interest Rates Steady',
    caption: 'Fed signals potential rate cuts later this year as inflation cools',
    content: `The Federal Reserve maintained its benchmark interest rate at the current range, citing progress in its fight against inflation while hinting at potential rate cuts in the coming months. The decision comes as recent economic data shows inflation continuing to moderate without significant impact on employment.

    Key economic indicators suggest the U.S. economy remains resilient, with steady job growth and consumer spending. However, the Fed emphasized its commitment to achieving its 2% inflation target before making any significant policy changes.

    Market analysts widely anticipated this decision, with many now focusing on the timing and pace of future rate reductions. The Fed's careful balancing act aims to maintain price stability without unnecessarily constraining economic growth.`,
    timestamp: '2024-03-20T14:30:00Z'
  },
  '2': {
    id: '2',
    headline: 'Tech Sector Leads Market Rally',
    caption: 'AI optimism drives tech stocks to new heights',
    content: `Technology stocks surged today, leading a broader market rally as investors remain optimistic about artificial intelligence developments and their potential impact on corporate productivity. Major tech companies announced new AI initiatives and partnerships, fueling investor enthusiasm.

    The rally was particularly strong among semiconductor manufacturers and cloud computing providers, which are seen as key beneficiaries of the AI boom. Market analysts note that while valuations are elevated, strong earnings growth continues to support stock prices.

    Trading volume was notably high, indicating broad participation in the rally. However, some analysts caution about the concentration of gains in a relatively small number of large-cap tech stocks.`,
    timestamp: '2024-03-20T13:15:00Z'
  },
  '3': {
    id: '3',
    headline: 'Global Trade Growth Exceeds Expectations',
    caption: 'International commerce shows resilience despite challenges',
    content: `Global trade volumes surpassed analyst expectations in the latest quarter, demonstrating remarkable resilience in the face of geopolitical tensions and supply chain adjustments. The World Trade Organization reported stronger-than-anticipated growth across major trading regions.

    Key factors contributing to this growth include the stabilization of shipping costs, improved port efficiency, and the gradual resolution of supply chain bottlenecks. Emerging markets showed particularly strong performance, with increased trade flows both among themselves and with developed economies.

    However, experts caution that challenges remain, including ongoing geopolitical tensions and the need for continued investment in supply chain diversification.`,
    timestamp: '2024-03-20T11:45:00Z'
  }
};

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? mockArticles[id] : undefined;

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">Article not found</p>
        </div>
        <Link to="/" className="text-blue-600 hover:underline">
          ← Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/" className="text-blue-600 hover:underline block mb-8">
        ← Back to all articles
      </Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{article.headline}</h1>
        <p className="text-xl text-gray-600 mb-6">{article.caption}</p>
        <time className="text-sm text-gray-500 block mb-8">
          {new Date(article.timestamp).toLocaleString()}
        </time>
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleView;
