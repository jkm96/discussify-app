export function getPageMetadata(title: string, description: string) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  return {
    metadataBase: new URL('https://petdiaries.io'),
    title: title,
    description: description,
    type: 'website',
    siteName:'Pet Diaries',
    url: currentUrl,
    creator : 'Pet Diaries',
    keywords: 'pet diary, online pet diary, pet photo diary, centralized pet memories, pet lovers diary',
    robots : 'index, follow',
    icons:{
      icon: '/favicon.ico'
    },
    openGraph: {
      metadataBase: new URL('https://petdiaries.io'),
      title: title,
      description: description,
      type: 'website',
      siteName:'Pet Diaries',
      url: currentUrl,
      creator : 'Pet Diaries',
      keywords: 'pet diary, online pet diary, pet photo diary, centralized pet memories, pet lovers diary',
      robots : 'index, follow',
      icons:{
        icon: '/favicon.ico'
      }
    },
  };
}

export function HtmlPageHead(pageTitle: string, pageDescription: string, pageType: string) {
  // Example: Fetch dynamic data or perform other client-side actions
  // You can update the title and meta tags based on fetched data
  const title = pageTitle;
  const type = pageType;
  const description = pageDescription;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Update the <head> of the document
  document.title = title;

  // Using `Head` component to update meta tags
  const metaTags = [
    { name: 'title', content: 'Pet Diaries - Online Diary for Pet Lovers' },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: 'pet diary, online pet diary, pet photo diary, centralized pet memories, pet lovers diary',
    },
    { name: 'robots', content: 'index, follow' },

    { property: 'og:title', content: 'Pet Diaries - Online Diary for Pet Lovers' },
    { property: 'og:description', content: description },
    { property: 'og:creator', content: 'Pet Diaries' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:type', content: type },

    { property: 'twitter:title', content: 'Pet Diaries - Online Diary for Pet Lovers' },
    { property: 'twitter:description', content: description },
    { property: 'twitter:creator', content: 'Pet Diaries' },
    { property: 'twitter:url', content: currentUrl },
    { property: 'twitter:type', content: type },
  ];

  // Remove existing meta tags
  metaTags.forEach(({ name, property }) => {
    const existingTag = document.querySelector(`meta[name="${name}"], meta[property="${property}"]`);
    if (existingTag) {
      existingTag.remove();
    }
  });

  // Add new meta tags
  metaTags.forEach(({ name, property, content }) => {
    const newTag = document.createElement('meta');
    if (name) {
      newTag.setAttribute('name', name);
    } else if (property) {
      newTag.setAttribute('property', property);
    }
    newTag.content = content;
    document.head.appendChild(newTag);
  });

  // Ensure the meta tags are removed when the component unmounts
  return () => {
    metaTags.forEach(({ name, property }) => {
      const existingTag = document.querySelector(`meta[name="${name}"], meta[property="${property}"]`);
      if (existingTag) {
        existingTag.remove();
      }
    });
  };
}