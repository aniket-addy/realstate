/*
|--------------------------------------------------------------------------
| FORMAT PRICE
|--------------------------------------------------------------------------
| Converts a number into an Indian Rupee formatted value.
|
| Examples:
| 500000       -> ₹5,00,000
| 1500000      -> ₹15,00,000
| 25000000     -> ₹2,50,00,000
|--------------------------------------------------------------------------
*/

export const formatPrice = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Price on Request";
  }

  const numericValue = Number(
    String(value).replace(/,/g, "")
  );

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericValue);
};

/*
|--------------------------------------------------------------------------
| FORMAT PRICE WITHOUT CURRENCY SYMBOL
|--------------------------------------------------------------------------
*/

export const formatPriceNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const numericValue = Number(
    String(value).replace(/,/g, "")
  );

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(numericValue);
};

/*
|--------------------------------------------------------------------------
| FORMAT PRICE IN LAKH / CRORE
|--------------------------------------------------------------------------
|
| Examples:
| 500000       -> ₹5 Lakh
| 1500000      -> ₹15 Lakh
| 10000000     -> ₹1 Cr
| 25000000     -> ₹2.5 Cr
|--------------------------------------------------------------------------
*/

export const formatPriceShort = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Price on Request";
  }

  const numericValue = Number(
    String(value).replace(/,/g, "")
  );

  if (Number.isNaN(numericValue)) {
    return String(value);
  }

  if (numericValue >= 10000000) {
    const crore = numericValue / 10000000;

    return `₹${Number(crore.toFixed(2))} Cr`;
  }

  if (numericValue >= 100000) {
    const lakh = numericValue / 100000;

    return `₹${Number(lakh.toFixed(2))} Lakh`;
  }

  return formatPrice(numericValue);
};

export default formatPrice;