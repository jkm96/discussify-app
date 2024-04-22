const convertStringToList = (tagsString: string) => {
  return tagsString.split(",").map(tag => tag.trim());
};


export { convertStringToList };

