import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Clock, ArrowRight, User } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { JournalArticle, JournalCategory } from '../types';

export const JournalPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const [articles, setArticles] = useState<JournalArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Materiality',
    'Design Philosophy',
    'Architecture',
    'Space Planning',
    'Curated Living'
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const data = await api.getArticles(currentCategory);
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, [currentCategory]);

  const filteredArticles = articles.filter(art => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title="Journal & Editorial Reflections"
        description="Atelier Élysée Journal: essays on architectural philosophy, materiality, travertine sourcing, and the art of restrained luxury living."
      />

      {/* Header */}
      <section className="px-6 md:px-12 pb-16 border-b border-beige-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest-luxury text-earth font-semibold block">
            Editorial Monograph
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-charcoal font-light leading-tight">
            Reflections on Materiality & Space.
          </h1>
          <p className="text-base sm:text-lg text-taupe font-light max-w-2xl leading-relaxed">
            Essays, stone sourcing diaries, architectural interviews, and curated design philosophies 
            penned by the principals of Atelier Élysée.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = currentCategory === cat || (cat === 'All' && !searchParams.get('category'));
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-xs uppercase tracking-luxury px-4 py-2 transition-all font-semibold ${
                      active
                        ? 'bg-[#121110] text-ivory shadow-sm'
                        : 'bg-beige-100 text-[#121110] border border-beige-300 hover:bg-beige-200 hover:text-earth'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-taupe" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search journal essays..."
                className="w-full pl-9 pr-4 py-2 bg-beige-100 border border-beige-300 text-xs text-charcoal placeholder-taupe/60 focus:outline-none focus:border-earth transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Journal Content */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-20">
          {loading ? (
            <div className="py-24 text-center font-serif text-xl italic text-taupe animate-pulse">
              Retrieving journal articles...
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="font-serif text-2xl text-charcoal">No articles match your query.</p>
              <button
                onClick={() => { setSearchQuery(''); handleCategoryChange('All'); }}
                className="text-xs uppercase tracking-luxury text-earth underline"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Lead Article */}
              {featuredArticle && !searchQuery && (
                <div className="border-b border-beige-300 pb-20">
                  <Link
                    to={`/journal/${featuredArticle.slug}`}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center group block"
                  >
                    <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-beige-200 shadow-xl">
                      <img
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center space-x-3 text-xs uppercase tracking-luxury text-earth font-semibold">
                        <span>{featuredArticle.category}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1 text-taupe font-normal">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{featuredArticle.readTime}</span>
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light group-hover:text-earth transition-colors leading-tight">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-sm text-taupe font-light leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="pt-2 flex items-center space-x-3 text-xs text-charcoal">
                        <span className="font-semibold">{featuredArticle.authorName}</span>
                        <span className="text-taupe">— {featuredArticle.publishedDate}</span>
                      </div>

                      <div className="pt-4">
                        <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury font-semibold text-charcoal border-b border-charcoal/40 group-hover:border-earth pb-1 transition-colors">
                          <span>Read Full Essay</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid of Remaining Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
                {(searchQuery ? filteredArticles : gridArticles).map((art) => (
                  <Link
                    key={art.id}
                    to={`/journal/${art.slug}`}
                    className="group flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[16/11] overflow-hidden bg-beige-200">
                        <img
                          src={art.coverImage}
                          alt={art.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] uppercase tracking-luxury text-taupe">
                        <span className="text-earth font-semibold">{art.category}</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-taupe font-light leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-beige-300 flex items-center justify-between text-xs text-taupe">
                      <span>{art.authorName}</span>
                      <span className="text-[10px]">{art.publishedDate}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
