export const getISODateTime = (dateString: any) => {
  const date = new Date(dateString);
  return date.toISOString();
};
