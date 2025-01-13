import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsGrid from './components/NewsGrid';
import ArticleView from './components/ArticleView';
import Error from './components/Error';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-gray-900">Economic News</h1>
          </div>
        </header>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<NewsGrid />} />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="*" element={<Error message="Page not found" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
