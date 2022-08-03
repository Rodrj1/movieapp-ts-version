export const formatLanguage = (language: string | undefined) => {
  if (language == "en") {
    return "English";
  } else if (language == "es") {
    return "Spanish";
  } else if (language == "ja") {
    return "Japanese";
  } else return "";
};
