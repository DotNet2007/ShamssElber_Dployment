// export const getArabicDayName = (value: string) => {
//   if (!value) return "";

//   const selectedDate = new Date(value);

//   return new Intl.DateTimeFormat("ar-EG", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(selectedDate);
// };

export const getArabicDayName = (value: string) => {
  if (!value) return "";

  const selectedDate = new Date(value);

  if (isNaN(selectedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(selectedDate);
};

// export const getArabicDayName = (value: string) => {
//   if (!value) return "";

//   return new Intl.DateTimeFormat("ar-EG", {
//     weekday: "long",
//   }).format(new Date(value));
// };