const transformObjectsForSelect = (objects) => {
  let transformObjects = [];
  let addressCounts = {};

  objects?.forEach((obj) => {
    const address = `${obj.location.city}, ${obj.location.address}`;

    // Если это адрес уже встречался, увеличиваем счетчик и добавляем индекс
    if (addressCounts[address]) {
      addressCounts[address]++;
      transformObjects.push({
        _id: obj._id,
        name: `${address} (${addressCounts[address]})`,
      });
    } else {
      // Иначе, просто добавляем адрес и устанавливаем счетчик в 1
      addressCounts[address] = 1;
      transformObjects.push({ _id: obj._id, name: address });
    }
  });

  return transformObjects;
};

export default transformObjectsForSelect;
