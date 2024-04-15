export type ColorName = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

type MoodColorMap = {
  [key: string]: ColorName;
};

const moodColorMap: MoodColorMap = {
  'happy': 'success',
  'playful': 'secondary',
  'content': 'default',
  'relaxed': 'primary',
  'excited': 'success',
  'curious': 'secondary',
  'sleepy': 'primary',
  'anxious': 'warning',
  'stressed': 'warning',
  'scared': 'danger',
  '#playtime': 'primary',
  '#firstwalk': 'success',
  '#mealtime': 'secondary',
  '#grooming': 'success',
};


type PdfColorMap = {
  [key: string]: PdfColorName;
};
export type PdfColorName = '#219653' | '#7722cb' | '#259AE6' | '#FFA70B' | '#da1028';
const PdfColorMap: PdfColorMap = {
  'happy': '#219653',
  'playful': '#7722cb',
  'content': '#259AE6',
  'relaxed': '#219653',
  'excited': '#219653',
  'curious': '#7722cb',
  'sleepy': '#7722cb',
  'anxious': '#FFA70B',
  'stressed': '#FFA70B',
  'scared': '#da1028',
  '#playtime': '#259AE6',
  '#firstwalk': '#219653',
  '#mealtime': '#7722cb',
  '#grooming': '#FFA70B',
};

const getRandomColorClass = (mood: string): ColorName => {
  const moodArray = mood.split(',');
  if (moodArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * moodArray.length);
    const randomMood = moodArray[randomIndex].toLowerCase().trim();
    return moodColorMap[randomMood] || 'primary';
  }

  return 'default';
};

const getMoodColorClassList = (moods: string[]): ColorName[] => {
  return moods.map(mood => {
    const trimmedMood = mood.toLowerCase().trim();
    return moodColorMap[trimmedMood] || 'primary';
  });
};

const getPdfMoodColorClassList = (moods: string[]): PdfColorName[] => {
  return moods.map(mood => {
    const trimmedMood = mood.toLowerCase().trim();
    return PdfColorMap[trimmedMood] || '#259AE6';
  });
};

const getSpeciesColor = (species:string) => {
  switch (species) {
    case 'dog':
      return 'danger';
    case 'cat':
      return 'primary';
    case 'bird':
      return 'warning';
    case 'fish':
      return 'primary';
    case 'rabbit':
      return 'primary';
    case 'hamster':
      return 'danger';
    case 'horse':
      return 'success';
    case 'ferret':
      return 'secondary';
    case 'guinea pig':
      return 'success';
    default:
      return 'default';
  }
}

export { getRandomColorClass, getMoodColorClassList, getPdfMoodColorClassList ,getSpeciesColor};

