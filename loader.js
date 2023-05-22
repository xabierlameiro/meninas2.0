// Docs: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({ src, quality, width }) {
    const url = new URL(`https://example.com${src}`);
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString() || '75');
    return url.href;
  }