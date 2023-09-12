import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const OpenObjectCloudButton = ({ object }) => {
  const handleOpenCloud = () => {
    const cloudLink = object?.cloudLink;

    if (cloudLink) {
      window.open(cloudLink, "_blank");
    }
  };

  return (
    <PositiveOutlinedButton title="Открыть облако" onClick={handleOpenCloud} />
  );
};

export default OpenObjectCloudButton;
