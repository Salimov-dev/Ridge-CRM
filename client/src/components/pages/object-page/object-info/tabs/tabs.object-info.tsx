import AcitivtyObjectPage from "../components/activity/activity.object-info";
import ContactsObjectInfo from "../components/contacts/contacts.object-info";
import InformationObjectInfo from "../components/information/information.object-info";

const tabsObjectInfo = (object, setState) => {
  return [
    {
      label: "Информация",
      component: <InformationObjectInfo object={object} />
    },
    {
      label: "Контакты",
      component: <ContactsObjectInfo object={object} setState={setState} />
    },
    {
      label: "Активность",
      component: <AcitivtyObjectPage object={object} setState={setState} />
    }
  ];
};

export default tabsObjectInfo;
