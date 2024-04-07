import UserLicense from "../models/UserLicense.js";

const licenseAccountTypeMiddleware = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    const userLicense = await UserLicense.findOne({
      where: { userId: currentUserId }
    });

    if (!userLicense) {
      return res
        .status(403)
        .json({ message: "Нет доступа к лицензии пользователя" });
    }

    const currentLicenseTypeId = userLicense.accountType;

    const trialLicenseTypeId = "71pbfi4954itj045tloop001";
    const activeLicenseTypeId = "718gkgdbn48jgfo3kktjt002";
    const blockedLicenseTypeId = "71kbjld394u5jgfdsjk4l003";

    const isLicenseTrialType = currentLicenseTypeId === trialLicenseTypeId;
    const isLicenseActiveType = currentLicenseTypeId === activeLicenseTypeId;
    const isLicenseBlockedType = currentLicenseTypeId === blockedLicenseTypeId;

    if (!isLicenseBlockedType) {
      next();
    } else {
      return res.status(403).json({
        error: { message: "Доступ заблокирован, внесите оплату за Подписку!" }
      });
    }
  } catch (error) {
    console.error("Ошибка при обработке лицензии пользователя:", error);
    return res.status(500).json({
      error: { message: "Ошибка сервера при проверке лицензии пользователя" }
    });
  }
};

export default licenseAccountTypeMiddleware;
