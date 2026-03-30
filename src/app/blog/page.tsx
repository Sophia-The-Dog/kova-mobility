import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog | Kova Mobility',
  description:
    'Transportation insights, Panama City Beach guides, and resources for commuters, nightlife groups, and anyone navigating Bay County without a car.',
  openGraph: {
    title: 'Kova Mobility Blog',
    description: 'Transportation insights and PCB guides.',
    url: 'https://www.kovamobility.com/blog',
  },
  alternates: { canonical: 'https://www.kovamobility.com/blog' },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[50vh]">
        <div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-blog.webp')" }}
        />
        <div className="relative z-[2] px-[7%] pb-16 pt-32 max-w-[760px]">
          <div className="section-label text-[var(--color-copper)]">
            <span>Blog</span>
          </div>
          <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] text-white leading-[1.06] mb-4">
            Insights &amp; Guides
          </h1>
          <p className="text-[clamp(0.95rem,1.5vw,1.1rem)] text-white/85 leading-relaxed max-w-[500px]">
            Transportation resources, PCB lifestyle guides, and everything you need
            to navigate Panama City Beach.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden border border-[var(--color-rule)] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <Image
                src={featured.heroImage}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3">
                {featured.category} &middot; {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <h2 className="text-2xl mb-3 group-hover:text-[var(--color-teal)] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                {featured.title}
              </h2>
              <p className="text-[var(--color-text-mid)] text-sm leading-relaxed mb-4">
                {featured.description}
              </p>
              <span className="text-[var(--color-copper)] text-xs font-medium tracking-[0.1em] uppercase">
                Read Article &rarr;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24 px-[5%]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-lg overflow-hidden border border-[var(--color-rule)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-2">
                  {post.category} &middot; {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-lg mb-2 group-hover:text-[var(--color-teal)] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-text-mid)] leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}