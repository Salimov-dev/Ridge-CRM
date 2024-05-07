export const getItemsIdsFromRowSelection = (items, rowSelection) => {
  return Object.keys(rowSelection)
    .map((index) => {
      const itemIndex = parseInt(index, 10);
      if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < items.length) {
        return items[itemIndex]._id;
      }
      return null;
    })
    .filter((itemId) => itemId !== null);
};
