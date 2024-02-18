// libraries
import { useTheme } from "@emotion/react";
import { tokens } from "@theme/theme";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// components
// import ContactForm from "@components/common/forms/contact.form";
// import FindcontactOnMap from "@common/find-contact-on-map/find-contact-on-map";
import SuccessCancelFormButtons from "@components/common/buttons/success-cancel-form-buttons";
import LoaderFullWindow from "@components/common/loader/loader-full-window";
import HeaderWithCloseButton from "@components/common/page-headers/header-with-close-button";
// schema
// import { contactSchema } from "@schemas/contact.schema";
// hooks
// import useFindcontact from "@hooks/contact/use-find-contact";
// store
import { getCurrentUserId } from "@store/user/users.store";
import ContactForm from "@components/common/forms/contact.form";
// import { createcontact } from "@store/contact/contacts.store";
// import { getcontactsList } from "@store/contact/contacts.store";
// import { getContactTypesList } from "@store/Contact/contact-types.store";
// import { getContactStatusesList } from "@store/Contact/contact-status.store";

const initialState = {
  name: "",
  company: "",
  position: "",
  comment: "",
  emails: [{ email: "" }],
  phones: [{ phone: "", isDefault: true }],
  objects: [{ objectId: "" }]
};

const CreateContact = React.memo(
  ({ contactPageId = "", onClose, isContactPage }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(false);
    // const statuses = useSelector(getContactStatusesList());
    // const contactTypes = useSelector(getContactTypesList());
    const currentUserId = useSelector(getCurrentUserId());

    // const contacts = useSelector(getcontactsList());
    // const currentUsercontacts = contacts?.filter(
    //   (obj) => obj?.userId === currentUserId
    // );

    const {
      register,
      watch,
      handleSubmit,
      setValue,
      control,
      formState: { errors }
    } = useForm({
      defaultValues: initialState,
      mode: "onChange"
      // resolver: yupResolver(contactSchema)
    });

    const data = watch();
    console.log("data", data);

    const onSubmit = (data) => {
      setIsLoading(true);

      // dispatch<any>(createContact(data))
      // .then(() => {
      //   onClose();
      //   toast.success("Контакт успешно создан!");
      // })
      // .catch((error) => {
      //   toast.error(error);
      // })
      // .finally(() => {
      //   setIsLoading(false);
      // });
    };

    useEffect(() => {
      // setValue<any>("contactPageId", contactPageId);
    }, []);

    return (
      <>
        <HeaderWithCloseButton
          title="Создать контакт"
          margin="0 0 20px 0"
          background="MidnightBlue"
          onClose={onClose}
        />
        <ContactForm
          data={data}
          // contacts={currentUsercontacts}
          // statuses={statuses}
          // types={contactTypes}
          watch={watch}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          // iscontactPage={iscontactPage}
        />
        <SuccessCancelFormButtons
          onSuccess={handleSubmit(onSubmit)}
          onCancel={onClose}
        />
        <LoaderFullWindow
          color={colors.grey[600]}
          size={75}
          isLoading={isLoading}
        />
      </>
    );
  }
);

export default CreateContact;
