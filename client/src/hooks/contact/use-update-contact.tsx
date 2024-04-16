const useUpdateContact = (contact, watch) => {
  // передаем новые добавленные и удаленные объекты
  const newObjects = watch("objects");
  const previousObjects = contact?.objects;
  const contactObjects = contact?.objects;
  const removedObjects = contactObjects?.filter(
    (obj) => !newObjects.some((item) => item.object === obj.object)
  );
  const addedObjects = newObjects?.filter(
    (newObject) =>
      !contactObjects?.some((obj) => obj.object === newObject.object)
  );

  // передаем новые добавленные и удаленные компании
  const newCompanies = watch("companies");
  const previousCompanies = contact?.companies;
  const contactCompanies = contact?.companies;
  const removedCompanies = contactCompanies?.filter(
    (obj) => !newCompanies.some((item) => item.company === obj.company)
  );
  const addedCompanies = newCompanies?.filter(
    (newObject) =>
      !contactCompanies?.some((comp) => comp.company === newObject.company)
  );

  return {
    previousObjects,
    removedObjects,
    addedObjects,
    previousCompanies,
    removedCompanies,
    addedCompanies
  };
};

export default useUpdateContact;
