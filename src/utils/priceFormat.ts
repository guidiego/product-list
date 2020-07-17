export const priceFormat = (price) =>
  (price / 100).toFixed(2).toString().replace('.', ',');

export default priceFormat;
