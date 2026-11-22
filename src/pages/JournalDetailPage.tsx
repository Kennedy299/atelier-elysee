import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Quote, ArrowRight, Share2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { JournalArticle } from '../types';

export const JournalDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<JournalArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<JournalArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      if (!slug) return;
      const data = await api.getArticleBySlug(slug);
      setArticle(data);

      const all = await api.getArticles();
      setRelatedArticles(all.filter(a => a.slug !== slug).slice(0, 3));
      setLoading(false);
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center font-serif text-2xl italic text-taupe">
        Opening journal manuscript...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center space-y-6 px-6">
        <h1 className="font-serif text-4xl text-charcoal">Article Not Found</h1>
        <p className="text-sm text-taupe">The requested essay could not be found in our editorial archives.</p>
        <Link
          to="/journal"
          className="px-6 py-3 bg-charcoal text-ivory text-xs uppercase tracking-luxury hover:bg-earth transition-colors"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 bg-ivory">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        ogImage={article.coverImage}
      />

      {/* Back to Journal Link */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Link
          to="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-taupe hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal Index</span>
        </Link>
      </div>

      {/* Article Header & Typography */}
      <article className="max-w-4xl mx-auto px-6 space-y-8 pb-20">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest-luxury text-earth font-semibold">
            <span>{article.category}</span>
            <span>•</span>
            <span className="text-taupe flex items-center space-x-1 font-normal">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-charcoal font-light leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-taupe font-serif italic leading-relaxed pt-2">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="pt-6 border-t border-beige-300 flex items-center justify-between text-xs text-charcoal">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-beige-200 border border-beige-300 flex items-center justify-center font-serif text-sm">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{article.authorName}</p>
                <p className="text-[11px] text-taupe">{article.authorRole}</p>
              </div>
            </div>
            <span className="text-taupe">{article.publishedDate}</span>
          </div>
        </div>

        {/* Lead Image */}
        <div className="aspect-[16/10] overflow-hidden bg-beige-200 shadow-xl my-10">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-charcoal/90 text-base md:text-lg font-light leading-relaxed pt-6">
          {article.content.map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-charcoal font-medium pt-6 pb-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={idx}
                  className="my-8 pl-6 border-l-2 border-earth font-serif italic text-xl md:text-2xl text-charcoal/90 leading-relaxed bg-beige-100/40 py-4 pr-4"
                >
                  “{block.text}”
                </blockquote>
              );
            }
            if (block.type === 'paragraph') {
              return (
                <p key={idx} className="leading-relaxed">
                  {block.text}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="pt-10 border-t border-beige-300 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-luxury text-taupe mr-2 font-medium">Keywords:</span>
          {article.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 bg-beige-100 text-charcoal text-xs font-light tracking-wide border border-beige-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles Showcase */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-6 md:px-12 bg-beige-50 border-t border-beige-300">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-end justify-between border-b border-beige-300 pb-4">
              <h3 className="font-serif text-3xl text-charcoal font-light">
                Further Reading
              </h3>
              <Link to="/journal" className="text-xs uppercase tracking-luxury text-earth hover:underline">
                View All Essays
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/journal/${rel.slug}`}
                  className="group block space-y-4"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-beige-200">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-earth font-semibold block">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-xl text-charcoal group-hover:text-earth transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-taupe font-light line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
