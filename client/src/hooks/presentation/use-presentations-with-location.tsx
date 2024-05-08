import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IPresentation } from "@interfaces/presentation/presentation.interface";
// store
import { getObjectsList } from "@store/object/objects.store";

interface IUsePresentationsWithLocation {
  presentations: IPresentation[];
}

const usePresentationsWithLocation = ({
  presentations
}: IUsePresentationsWithLocation) => {
  const [presentationsWithLocation, setPresentationsWithLocation] = useState<
    IPresentation[]
  >([]);

  const objects: IObject[] = useSelector(getObjectsList());

  useEffect(() => {
    if (presentations && objects) {
      const presentationsWithLocationData = presentations.map(
        (presentation: IPresentation) => {
          const matchingObject: IObject | undefined = objects?.find(
            (object: IObject) => object._id === presentation.objectId
          );

          if (matchingObject) {
            const newPres: IPresentation = {
              ...presentation,
              city: matchingObject?.city,
              address: matchingObject?.address,
              latitude: matchingObject?.latitude,
              longitude: matchingObject?.longitude
            };

            return newPres;
          } else {
            return presentation;
          }
        }
      );

      if (
        JSON.stringify(presentationsWithLocationData) !==
        JSON.stringify(presentationsWithLocation)
      ) {
        setPresentationsWithLocation(presentationsWithLocationData);
      }
    }
  }, [presentations, objects]);

  return { presentationsWithLocation };
};

export default usePresentationsWithLocation;
