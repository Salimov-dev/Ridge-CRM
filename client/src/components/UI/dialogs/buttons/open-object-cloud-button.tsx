import PositiveOutlinedButton from "../../../common/buttons/positive-outlined-button";

const OpenObjectCloudButton = ({ object }) => {
  const hasCloud = Boolean(object?.cloudLink?.length);

  const handleOpenCloud = () => {
    const cloudLink = object?.cloudLink;

    if (cloudLink) {
      window.open(cloudLink, "_blank");
    }
  };

  return hasCloud ? (
    <PositiveOutlinedButton title="Открыть облако" onClick={handleOpenCloud} />
  ) : null;
};

export default OpenObjectCloudButton;
