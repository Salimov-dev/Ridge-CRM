import { Dispatch, SetStateAction } from "react";
import { IObject } from "@interfaces/object/object.interface";
import AcitivtyObjectPage from "../components/activity/activity.object-info";
import ContactsObjectInfo from "../components/contacts/contacts.object-info";
import InformationObjectInfo from "../components/information/information.object-info";
import { IDialogPagesState } from "@interfaces/state/dialog-pages-state.interface";

interface TabsProps {
  state: IDialogPagesState;
  object: IObject;
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
