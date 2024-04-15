import { StyleSheet } from '@react-pdf/renderer';

export function toTitleCase(input: string): string {
  return input.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function toSlug(inputString: string): string {
  return inputString
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function PdfPreviewStyle() {
  return StyleSheet.create({
    document: {
      height: 500,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      height: 500,
    },
    titlePage: {
      textAlign: 'center',
      fontSize: 25,
      fontFamily: 'Oswald',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      height: 500,
    },
    title: {
      marginTop: 100,
      textAlign: 'center',
      fontSize: 25,
      fontFamily: 'Oswald',
    },
    author: {
      fontSize: 12,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      fontFamily: 'Oswald',
    },
    moodtags: {
      fontSize: 13,
      fontFamily: 'Times-Roman',
      marginBottom: 5,
    },
    text: {
      fontSize: 15,
      fontFamily: 'Times-Roman',
    },
    content: {
      marginTop: 5,
      marginBottom: 5,
      fontSize: 15,
      fontFamily: 'Times-Roman',
    },
    header: {
      fontSize: 9,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });
}

export function MagicStudioPdfStyle() {
  return StyleSheet.create({
    document: {
      height: 500,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      height: 500,
    },
    titlePage: {
      textAlign: 'center',
      fontSize: 25,
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      height: 500,
    },
    title: {
      marginTop: 100,
      textAlign: 'center',
      fontSize: 25,
    },
    author: {
      fontSize: 12,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
    },
    moodtags: {
      fontSize: 13,
      marginBottom: 5,
    },
    text: {
      fontSize: 15,
    },
    content: {
      marginTop: 5,
      marginBottom: 5,
      fontSize: 14,
    },
    header: {
      fontSize: 9,
      marginBottom: 20,
      textAlign: 'center',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
    },
  });
}

