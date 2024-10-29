export const priceConversion = (range: string | number) => {
  const convertRange = typeof range === "string" ? parseInt(range) : range;
  return convertRange.toLocaleString();
};

export const formatPrice = (priceRange: string | number) => {
  const convertRange = typeof priceRange === "string" ? parseInt(priceRange) : priceRange;
  if (convertRange >= 1e9) {
    return (convertRange / 1e9) + 'B';
  } else if (convertRange >= 1e6) {
    return (convertRange / 1e6) + 'M';
  } else if (convertRange >= 1e3) {
    return (convertRange / 1e3)+ 'K';
  }
  return convertRange.toString();
};