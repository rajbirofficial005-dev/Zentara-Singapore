import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import FloatingTOC from '../components/FloatingTOC';
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContentBlock {
  id: string;
  type: string;
  content: string;
}

interface ArticleTopic {
  id: string;
  title: string;
  content?: string;
  blocks?: ContentBlock[];
  order: number;
}

interface ArticleDetail {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  topics: ArticleTopic[];
}

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const tocRef = useRef<HTMLDivElement>(null);
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const [tocStyle, setTocStyle] = useState({});

  // Error message to display when not loading
  const errorMessage = !loading && error ? (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-200 p-4 rounded-lg mb-8">
        {error}
        <div className="mt-4">
          <Link to="/articles" className="text-brand-500 hover:text-brand-400 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Articles
          </Link>
        </div>
      </div>
    </div>
  ) : null;

  // Load chapter and topics from Firestore
  useEffect(() => {
    const fetchChapterAndTopics = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Get chapter document
        const chapterRef = doc(db, 'chapters', id);
        const chapterSnap = await getDoc(chapterRef);
        
        if (!chapterSnap.exists()) {
          setError('Chapter not found');
          setLoading(false);
          return;
        }
        
        const chapterData = chapterSnap.data();
        
        // Get topics for this chapter
        const topicsRef = collection(db, `chapters/${id}/topics`);
        const topicsQuery = query(topicsRef, orderBy('order'));
        const topicsSnap = await getDocs(topicsQuery);
        
        const topicsData = topicsSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled Topic',
            blocks: data.blocks || [],
            content: data.content,
            order: data.order || 0
          };
        });
        
        const articleData: ArticleDetail = {
          id: chapterSnap.id,
          title: chapterData.title || 'Untitled Chapter',
          description: chapterData.description || 'No description available.',
          imageUrl: chapterData.imageUrl,
          topics: topicsData as ArticleTopic[]
        };
        
        setArticle(articleData);
        
        // Set initial active section if topics exist
        if (topicsData.length > 0) {
          setActiveSection(topicsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching chapter data:', error);
        setError('Failed to load chapter data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChapterAndTopics();
  }, [id]);

  // Smooth scroll to section
  useEffect(() => {
    const handleSectionClick = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const links = document.querySelectorAll('nav[aria-label="Table of contents"] a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleSectionClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleSectionClick));
    };
  }, [article]);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [article]);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      
      // Calculate TOC placement
      const toc = tocRef.current as HTMLDivElement;
      const container = articleContainerRef.current as HTMLDivElement;
      const footerOffset = 32; // px from bottom
      const scrollY = window.scrollY;
      const containerTop = container.offsetTop;
      const containerBottom = container.offsetTop + container.offsetHeight;
      const tocHeight = toc.offsetHeight;
      const headerOffset = 32; // px from top
      const tocTop = scrollY + headerOffset;
      const tocBottom = tocTop + tocHeight;

      // If above the article, absolute at the top
      if (scrollY + headerOffset <= containerTop) {
        setTocStyle({ position: 'absolute', top: 0, left: 0, width: 250 });
      }
      // If below the article, absolute at the bottom
      else if (tocBottom + footerOffset >= containerBottom) {
        setTocStyle({
          position: 'absolute',
          top: container.offsetHeight - tocHeight - footerOffset,
          left: 0,
          width: 250,
        });
      }
      // Else, fixed within the viewport
      else {
        setTocStyle({
          position: 'fixed',
          top: headerOffset,
          left: container.getBoundingClientRect().left,
          width: 250,
          zIndex: 30,
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('scroll'));
        }
      }, 0);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="bg-neutral-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-24">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Loading back link */}
            <div className="w-32 h-6 bg-neutral-800 rounded animate-pulse"></div>
            
            {/* Loading title */}
            <div className="space-y-4">
              <div className="w-3/4 h-12 bg-neutral-800 rounded animate-pulse"></div>
              <div className="w-full h-6 bg-neutral-800 rounded animate-pulse"></div>
              <div className="w-2/3 h-6 bg-neutral-800 rounded animate-pulse"></div>
            </div>
            
            {/* Loading image */}
            <div className="w-full h-96 bg-neutral-800 rounded-2xl animate-pulse"></div>
            
            {/* Loading content */}
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="w-1/2 h-8 bg-neutral-800 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-neutral-800 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-neutral-800 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-neutral-800 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-neutral-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-24">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-12 h-12 text-neutral-600" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-secondary font-primary">Article Not Found</h1>
              <p className="text-neutral-300 font-primary text-lg max-w-md mx-auto">
                The article you're looking for doesn't exist or has been removed.
              </p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center px-8 py-3 bg-primary text-neutral-900 rounded-full font-medium font-primary hover:bg-accent transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Link & Breadcrumb */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/articles"
              className="inline-flex items-center text-neutral-400 hover:text-primary transition-colors duration-200 group font-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="border-b border-transparent group-hover:border-primary transition-all duration-200">
                Back to Articles
              </span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div 
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 text-primary">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-medium font-primary uppercase tracking-wider">Guide</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary font-primary leading-tight">
              {article.title}
            </h1>
            
            <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed font-primary max-w-4xl">
              {article.description}
            </p>

            {/* Article metadata */}
            <div className="flex flex-wrap gap-6 text-neutral-400 text-sm font-primary pt-4 border-t border-neutral-800">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article?.topics?.length || 0} sections</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                <span>Comprehensive Guide</span>
              </div>
            </div>
          </motion.div>

          {/* Featured image */}
          <motion.div 
            className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl mb-12 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {article?.imageUrl ? (
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <BookOpen className="w-16 h-16 text-neutral-600 mx-auto" />
                  <p className="text-neutral-500 font-primary">Knowledge Guide</p>
                </div>
              </div>
            )}
          </motion.div>

          {loading && (
            <div className="max-w-4xl mx-auto p-6">
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 animate-pulse flex items-center justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-80"></div>
                  </div>
                  <p className="text-neutral-400 font-primary">Loading chapter content...</p>
                </div>
              </div>
            </div>
          )}
          
          {errorMessage}

          {/* Content Layout with TOC */}
          <div className="flex max-w-none mx-auto relative" ref={articleContainerRef}>
            {/* Floating TOC */}
            <aside
              ref={tocRef}
              style={tocStyle}
              className="hidden lg:block"
            >
              {loading ? (
                <div className="animate-pulse space-y-4 bg-neutral-800 rounded-2xl p-6 border border-neutral-700">
                  <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-neutral-700 rounded w-5/6 mb-2"></div>
                  ))}
                </div>
              ) : (
                <FloatingTOC sections={article.topics} activeSection={activeSection} />
              )}
            </aside>

            {/* Main Content */}
            <main className="flex-1" style={{ marginLeft: 290 }}>
              <motion.div 
                className="space-y-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {article.topics.map((section, index) => (
                  <motion.section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                  >
                    <div className="bg-neutral-800/50 rounded-2xl p-8 border border-neutral-700/50">
                      <h2 className="text-2xl lg:text-3xl text-primary font-semibold font-primary mb-6 flex items-center">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        {section.title}
                      </h2>
                      <div
                        className="prose prose-invert max-w-none prose-lg
                          prose-p:text-white prose-p:leading-relaxed prose-p:mb-6
                          prose-headings:text-secondary prose-headings:font-semibold prose-headings:font-primary
                          prose-h3:text-xl prose-h4:text-lg prose-h3:mb-4 prose-h4:mb-3
                          prose-strong:text-secondary prose-strong:font-semibold
                          prose-ul:text-white prose-ol:text-white prose-ul:mb-6 prose-ol:mb-6
                          prose-li:text-white prose-li:leading-relaxed prose-li:mb-2
                          prose-a:text-primary prose-a:no-underline hover:prose-a:underline hover:prose-a:text-accent
                          prose-code:text-primary prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                          prose-blockquote:border-l-primary prose-blockquote:bg-neutral-900/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:mb-6
                          prose-blockquote:text-white prose-blockquote:italic
                          prose-img:rounded-xl prose-img:shadow-lg
                          font-primary"
                      >
                        {section.content ? (
                          <div 
                            className="article-content"
                            style={{ color: '#ffffff' }}
                            dangerouslySetInnerHTML={{ __html: section.content }} 
                          />
                        ) : section.blocks && section.blocks.length > 0 ? (
                          <div className="space-y-4">
                            {section.blocks.map((block) => (
                              <div key={block.id}>
                                {block.type === 'paragraph' && (
                                  <p className="leading-relaxed text-white">{block.content}</p>
                                )}
                                {/* Add other block type handlers as needed */}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-neutral-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="font-primary">Content for this section is coming soon.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.section>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                className="mt-16 text-center bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl p-8 border border-neutral-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-secondary font-primary mb-4">
                  Ready to get started?
                </h3>
                <p className="text-neutral-300 font-primary mb-6 max-w-2xl mx-auto">
                  Apply what you've learned and start your international money transfer journey with confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/articles"
                    className="inline-flex items-center px-6 py-3 bg-neutral-800 text-secondary rounded-full font-medium font-primary hover:bg-neutral-700 transition-all duration-200 hover:scale-105"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    More Guides
                  </Link>
                  <button
                    onClick={() => window.open('https://customer.zentara.com/', '_blank')}
                    className="inline-flex items-center px-6 py-3 bg-primary text-neutral-900 rounded-full font-medium font-primary hover:bg-accent transition-all duration-200 hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            </main>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ArticleDetail;