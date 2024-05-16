import { Dispatch, SetStateAction } from "react";
// interfaces
import { IObject } from "@interfaces/object/object.interface";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";
// components
import AcitivtyObjectPage from "../components/activity/activity.object-info";
import ContactsObjectInfo from "../components/contacts/contacts.object-info";
import InformationObjectInfo from "../components/information/information.object-info";

interface TabsProps {
  object: IObject | null;
  state: IDialogPagesState;
  setStateDialogPages: Dispatch<SetStateAction<IDialogPagesState>>;
}

const tabsObjectInfoPage = ({
  object,
  state,
  setStateDialogPages
}: TabsProps) => {
  return [
    {
      label: "Информация",
      component: <InformationObjectInfo object={object} />
    },
    {
      label: "Контакты",
      component: (
        <ContactsObjectInfo object={object} setState={setStateDialogPages} />
      )
    },
    {
      label: "Активность",
      component: (
        <AcitivtyObjectPage
          object={object}
          state={state}
          setState={setStateDialogPages}
        />
      )
    }
  ];
};

export default tabsObjectInfoPage;
