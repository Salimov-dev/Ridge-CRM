export const getPriceForRentMetr = (object) => {
  const costForMetr = Math.round(
    object?.commercialTerms.rentPrice / object?.commercialTerms.rentSquare
  );

  return costForMetr || "";
};
