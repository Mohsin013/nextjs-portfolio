"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MEDIUM_PROFILE_URL = "https://medium.com/@info_69552";

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  description: string;
  content: string;
  thumbnail: string;
};

function extractThumbnail(content: string): string {
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : "";
}

function extractDescription(content: string): string {
  const stripped = content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
  return stripped.slice(0, 160) + (stripped.length > 160 ? "..." : "");
}

function sanitizeContent(html: string, thumbnail: string): string {
  let firstImageRemoved = false;
  return html
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, (match) => {
      const imgMatch = match.match(/<img[^>]+src="([^"]+)"[^>]*>/);
      const captionMatch = match.match(/<figcaption>([\s\S]*?)<\/figcaption>/);
      if (imgMatch) {
        if (!firstImageRemoved && thumbnail && imgMatch[1] === thumbnail) {
          firstImageRemoved = true;
          return "";
        }
        const caption = captionMatch ? `<p class="text-xs text-white/30 text-center mt-2 font-mono">${captionMatch[1]}</p>` : "";
        return `<div class="my-6"><img src="${imgMatch[1]}" alt="" class="w-full rounded-xl border border-white/5" />${caption}</div>`;
      }
      return "";
    })
    .replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, src) => {
      if (!firstImageRemoved && thumbnail && src === thumbnail) {
        firstImageRemoved = true;
        return "";
      }
      return `<img src="${src}" alt="" class="w-full rounded-xl border border-white/5 my-6" />`;
    })
    .replace(/<h3[^>]*>(.*?)<\/h3>/g, '<h3 class="text-xl sm:text-2xl font-semibold text-white mt-8 mb-4">$1</h3>')
    .replace(/<h4[^>]*>(.*?)<\/h4>/g, '<h4 class="text-lg font-semibold text-white mt-6 mb-3">$1</h4>')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '<p class="text-sm sm:text-base text-white/60 leading-relaxed mb-4">$1</p>')
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g, '<blockquote class="border-l-2 border-accent-blue/50 pl-4 my-6 text-white/50 italic">$1</blockquote>')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, '<pre class="glass rounded-xl p-4 my-6 overflow-x-auto text-xs sm:text-sm font-mono text-accent-blue">$1</pre>')
    .replace(/<code[^>]*>(.*?)<\/code>/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-accent-blue text-xs font-mono">$1</code>')
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, '<ul class="space-y-2 my-4 pl-4">$1</ul>')
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, '<ol class="space-y-2 my-4 pl-4 list-decimal">$1</ol>')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '<li class="text-sm text-white/60 leading-relaxed">$1</li>')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, '<a href="$1" target="_blank" rel="noreferrer" class="text-accent-blue hover:text-white underline underline-offset-2 transition-colors">$2</a>')
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-white font-medium">$1</strong>')
    .replace(/<em>(.*?)<\/em>/g, '<em class="text-white/70">$1</em>')
    .replace(/<hr[^>]*\/?>/g, '<hr class="border-white/10 my-8" />');
}

function parseRSS(xml: string): BlogPost[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");

  return Array.from(items).map((item) => {
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent || "";
    const categories = Array.from(item.querySelectorAll("category")).map((c) => c.textContent || "");
    const contentEncoded = item.getElementsByTagName("content:encoded")[0]?.textContent || "";
    const description = extractDescription(contentEncoded);
    const thumbnail = extractThumbnail(contentEncoded);
    const content = sanitizeContent(contentEncoded, thumbnail);

    return { title, link, pubDate, categories, description, content, thumbnail };
  });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function timeAgo(dateStr: string): string {
  const now = new Date().getTime();
  const then = new Date(dateStr).getTime();
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

function estimateReadTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/feed`);
        if (!res.ok) throw new Error("Failed to fetch");
        const xml = await res.text();
        const parsed = parseRSS(xml);
        setPosts(parsed);
      } catch {
        setError("Failed to load blog posts. Visit Medium directly.");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="min-h-[100dvh] bg-background relative">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-[100]">
          <div className="glass-heavy mx-5 sm:mx-auto mt-4 max-w-4xl rounded-full px-5 sm:px-8 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" transitionTypes={["nav-back"]} className="text-sm font-mono font-bold text-white tracking-wider">
                MI<span className="text-accent-blue">.</span>
              </Link>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-[10px] sm:text-xs font-mono text-white/40 hover:text-white transition-colors tracking-widest"
              >
                ← ALL POSTS
              </button>
            </div>
          </div>
        </nav>

        {/* Article reader */}
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-20">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs font-mono text-white/30 hover:text-accent-blue transition-colors mb-8 flex items-center gap-2"
          >
            ← BACK TO ALL POSTS
          </button>

          {/* Article header */}
          <header className="mb-8 sm:mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-white/40">
              <time>{formatDate(selectedPost.pubDate)}</time>
              <span className="text-white/20">•</span>
              <span>{timeAgo(selectedPost.pubDate)}</span>
              <span className="text-white/20">•</span>
              <span>{estimateReadTime(selectedPost.content)} min read</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              {selectedPost.title}
            </h1>

            {selectedPost.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.categories.map((cat, i) => (
                  <span key={i} className="text-[10px] sm:text-xs font-mono text-accent-blue/80 glass px-2.5 py-1 rounded-full">
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {selectedPost.thumbnail && (
              <div className="rounded-2xl overflow-hidden border border-white/5 mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedPost.thumbnail}
                  alt={selectedPost.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </header>

          {/* Article body */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          {/* Read on Medium CTA */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
            <div className="glass-heavy rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-sm text-white/50 mb-4 font-mono">
                Enjoyed this article? Read it on Medium for the full experience.
              </p>
              <a
                href={selectedPost.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold text-sm rounded-lg hover:bg-white/90 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                READ ON MEDIUM
              </a>
            </div>
          </div>

          {/* Back to all posts */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-mono text-white/40 hover:text-accent-blue transition-colors"
            >
              ← BACK TO ALL POSTS
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background relative">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100]">
        <div className="glass-heavy mx-5 sm:mx-auto mt-4 max-w-4xl rounded-full px-5 sm:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" transitionTypes={["nav-back"]} className="text-sm font-mono font-bold text-white tracking-wider">
              MI<span className="text-accent-blue">.</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" transitionTypes={["nav-back"]} className="text-[10px] sm:text-xs font-mono text-white/40 hover:text-white/70 transition-colors tracking-widest">
                PORTFOLIO
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/labs" transitionTypes={["nav-forward"]} className="text-[10px] sm:text-xs font-mono text-white/40 hover:text-white/70 transition-colors tracking-widest">
                LABS
              </Link>
              <span className="text-white/20">|</span>
              <span className="text-[10px] sm:text-xs font-mono text-accent-blue tracking-widest">
                BLOG
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-20">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <Link href="/" transitionTypes={["nav-back"]} className="text-xs font-mono text-white/30 hover:text-accent-blue transition-colors mb-4 inline-block">
            ← BACK TO PORTFOLIO
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-3 sm:mb-4">
            <span className="shimmer-text">Blog</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/40 max-w-xl mb-4">
            Technical articles on AI systems, multi-agent orchestration, distributed architecture, and modern software engineering.
          </p>
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-accent-blue hover:text-white transition-colors glass px-3 py-1.5 rounded-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
            FOLLOW ON MEDIUM ↗
          </a>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-5 sm:p-6 animate-pulse">
                <div className="h-32 bg-white/5 rounded-lg mb-4" />
                <div className="h-4 bg-white/10 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-white/50 mb-4">{error}</p>
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-6 py-3 bg-accent-blue text-white font-mono text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              VISIT MEDIUM PROFILE
            </a>
          </div>
        )}

        {/* Blog posts grid */}
        {!loading && !error && (
          <>
            {/* Featured post (first one) */}
            {posts.length > 0 && (
              <button
                onClick={() => setSelectedPost(posts[0])}
                className="block w-full text-left mb-8 sm:mb-12 group cursor-pointer"
              >
                <article className="glass-heavy rounded-2xl overflow-hidden border border-white/5 hover:border-accent-blue/20 transition-all duration-300">
                  {posts[0].thumbnail && (
                    <div className="relative h-48 sm:h-64 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={posts[0].thumbnail}
                        alt={posts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-mono text-accent-blue glass px-2 py-1 rounded-full">LATEST</span>
                      </div>
                    </div>
                  )}
                  <div className="p-5 sm:p-8">
                    <div className="flex items-center gap-3 mb-3 text-xs font-mono text-white/40">
                      <time>{formatDate(posts[0].pubDate)}</time>
                      <span className="text-white/20">•</span>
                      <span>{timeAgo(posts[0].pubDate)}</span>
                      <span className="text-white/20">•</span>
                      <span>{estimateReadTime(posts[0].content)} min read</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white group-hover:text-accent-blue transition-colors mb-3 leading-tight">
                      {posts[0].title}
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
                      {posts[0].description}
                    </p>
                    {posts[0].categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {posts[0].categories.slice(0, 4).map((cat, i) => (
                          <span key={i} className="text-[10px] font-mono text-white/40 glass px-2 py-0.5 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </button>
            )}

            {/* Rest of the posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {posts.slice(1).map((post, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPost(post)}
                  className="block w-full text-left group cursor-pointer"
                >
                  <article className="glass rounded-xl p-5 sm:p-6 h-full hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-accent-blue/20 flex flex-col">
                    {post.thumbnail && (
                      <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden mb-4 -mx-1 -mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-white/30">
                      <time>{formatDate(post.pubDate)}</time>
                      <span>•</span>
                      <span>{estimateReadTime(post.content)} min</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-accent-blue transition-colors mb-2 leading-snug flex-grow">
                      {post.title}
                    </h3>

                    <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">
                      {post.description}
                    </p>

                    {post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {post.categories.slice(0, 3).map((cat, ci) => (
                          <span key={ci} className="text-[9px] font-mono text-white/30 glass px-1.5 py-0.5 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </button>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-12 sm:mt-16 text-center">
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-4 glass-heavy rounded-xl text-sm font-mono text-white/70 hover:text-white hover:bg-white/[0.06] transition-all border border-white/5 hover:border-accent-blue/20"
              >
                VIEW ALL ARTICLES ON MEDIUM ↗
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
