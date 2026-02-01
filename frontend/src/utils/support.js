export const formateDate = (date) => {
  const res = new Date(date).toLocaleDateString();
  return res;
};
