import {appName, internalBaseUrl} from "@/boundary/constants/appConstants";

export function getPageMetadata(title: string, description: string) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  return {
    metadataBase: new URL(internalBaseUrl),
    title: title,
    description: description,
    type: 'website',
    siteName: appName,
    url: currentUrl,
    creator : appName,
    keywords: 'pet diary, online pet diary, pet photo diary, centralized pet memories, pet lovers diary',
    robots : 'index, follow',
    icons:{
      icon: '/favicon.ico'
    },
    openGraph: {
      metadataBase: new URL(internalBaseUrl),
      title: title,
      description: description,
      type: 'website',
      siteName: appName,
      url: currentUrl,
      creator : appName,
      keywords: 'pet diary, online pet diary, pet photo diary, centralized pet memories, pet lovers diary',
      robots : 'index, follow',
      icons:{
        icon: '/favicon.ico'
      }
    },
  };
}

export function convertSlugToTitleCase(input: string): string {
  const words = input.split('-');
  return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ');
}