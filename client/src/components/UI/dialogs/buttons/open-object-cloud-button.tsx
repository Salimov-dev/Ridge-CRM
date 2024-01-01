import ButtonStyled from "@components/common/buttons/button-styled";

const OpenObjectCloudIcon = ({ object }) => {
  const hasCloud = !!object?.cloudLink?.length;

  const handleOpenCloud = () => {
    const cloudLink = object?.cloudLink;

    if (cloudLink) {
      window.open(cloudLink, "_blank");
    }
  };

  return hasCloud ? (
    <ButtonStyled
      title="Открыть облако"
      style="SUCCESS"
      onClick={handleOpenCloud}
    />
  ) : null;
};

export default OpenObjectCloudIcon;
