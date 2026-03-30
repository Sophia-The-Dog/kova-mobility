import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.kovamobility.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.heroImage }],
    },
    alternates: {
      canonical: `https://www.kovamobility.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return (
          <h2
            key={i}
            className="text-2xl mt-10 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {block.replace('## ', '')}
          </h2>
        );
      }
      return (
        <p key={i} className="text-[var(--color-text-mid)] leading-[1.85] mb-5">
          {block}
        </p>
      );
    });
  };

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            image: `https://www.kovamobility.com${post.heroImage}`,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Kova Mobility',
              url: 'https://www.kovamobility.com',
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-teal-dark)] via-[var(--color-teal-dark)]/60 to-transparent" />
        </div>
        <div className="relative z-[2] px-[7%] pb-12 pt-32 max-w-[760px]">
          <div className="text-[0.65rem] font-medium tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3">
            {post.category} &middot;{' '}
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <h1 className="text-[clamp(2rem,4.5vw,3.2rem)] text-white leading-[1.1]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <article className="py-16 px-[5%]">
        <div className="max-w-[720px] mx-auto">
          {renderContent(post.content)}

          {/* Internal links to Party Pass & Membership */}
          <div className="mt-12 pt-8 border-t border-[var(--color-rule)]">
            <p className="text-sm text-[var(--color-text-light)] mb-4">
              Interested in reliable transportation in Panama City Beach?
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/party-pass" className="btn-primary text-sm">
                Party Pass &rarr;
              </Link>
              <Link href="/membership" className="btn-teal text-sm">
                Membership Plans
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h3 className="text-xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            More from the Blog
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-[var(--color-off-white)] rounded-lg overflow-hidden border border-[var(--color-rule)] hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={related.heroImage}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base group-hover:text-[var(--color-teal)] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {related.title}
                    </h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}