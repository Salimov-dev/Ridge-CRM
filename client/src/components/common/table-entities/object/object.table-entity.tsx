import { Dispatch, FC, SetStateAction } from "react";
// components
import SingleObjectTableEntity from "./components/single.object-table-entity";
import MultiObjectsTableEntity from "./components/multi.object-table-entity";
// interfaces
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
import { IObject } from "@interfaces/object/object.interface";

interface ObjectTableEntityProps {
  object?: IObject | null;
  objects?: { object: string }[] | null;
  setState: Dispatch<SetStateAction<IDialogPagesState>>;
}

const ObjectTableEntity: FC<ObjectTableEntityProps> = ({
  object,
  objects,
  setState
}) => {
  return object ? (
    <SingleObjectTableEntity object={object} setState={setState} />
  ) : (
    <MultiObjectsTableEntity objects={objects} setState={setState} />
  );
};

export default ObjectTableEntity;
