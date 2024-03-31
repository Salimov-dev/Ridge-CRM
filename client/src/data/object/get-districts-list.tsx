import { districtsSPB } from "@data/districts/districts-Spb";
import { districtsMaykop } from "@data/districts/districts-Maykop";
import { districtsUfa } from "@data/districts/districts-Ufa";
import { districtsUlanUde } from "@data/districts/districts-Ulan-Ude";
import { districtsGornoAltaysk } from "@data/districts/districts-Gorno-Altaisk";
import { districtsMahachkala } from "@data/districts/districts-Mahachkala";
import { districtsNalchik } from "@data/districts/districts-Nalchik";
import { districtsElista } from "@data/districts/districts-Elista";
import { districtsCherkessk } from "@data/districts/districts-Cherkessk";
import { districtsPetrozavodsk } from "@data/districts/districts-Petrozavodsk";
import { districtsSyktyvkar } from "@data/districts/districts-Syktivkar";
import { districtsSimferopol } from "@data/districts/districts-Simferopol";
import { districtsYoshkarOla } from "@data/districts/districts-Yoshkar-Ola";
import { districtsSaransk } from "@data/districts/districts-Saransk";
import { districtsYakutsk } from "@data/districts/districts-Yakutsk";
import { districtsVladikavkaz } from "@data/districts/districts-Vladikavkaz";
import { districtsKazan } from "@data/districts/districts-Kazan";
import { districtsKizil } from "@data/districts/districts-Kizil";
import { districtsIzhevsk } from "@data/districts/districts-Izhevsk";
import { districtsAbakan } from "@data/districts/districts-Abakan";
import { districtsGrozny } from "@data/districts/districts-Grozny";
import { districtsCheboksary } from "@data/districts/districts-Cheboksary";
import { districtsBarnaul } from "@data/districts/districts-Barnaul";
import { districtsChita } from "@data/districts/districts-Chita";
import { districtsPetropavlovskKamchatsky } from "@data/districts/districts-Petropavlovsk-Kamchatsky";
import { districtsKrasnodar } from "@data/districts/districts-Krasnodar";
import { districtsKrasnoyarsk } from "@data/districts/districts-Krasnoyarsk";
import { districtsPerm } from "@data/districts/districts-Perm";
import { districtsVladivostok } from "@data/districts/districts-Vladivostok";
import { districtsStavropol } from "@data/districts/districts-Stavropol";
import { districtsKhabarovsk } from "@data/districts/districts-Khabarovsk";
import { districtsBlagoveshchensk } from "@data/districts/districts-Blagoveshchensk";
import { districtsArkhangelsk } from "@data/districts/districts-Arkhangelsk";
import { districtsAstrakhan } from "@data/districts/districts-Astrakhan";
import { districtsBelgorod } from "@data/districts/districts-Belgorod";
import { districtsBryansk } from "@data/districts/districts-Bryansk";
import { districtsVladimir } from "@data/districts/districts-Vladimir";
import { districtsVolgograd } from "@data/districts/districts-Volgograd";
import { districtsVologda } from "@data/districts/districts-Vologda";
import { districtsVoronezh } from "@data/districts/districts-Voronezh";
import { districtsIvanovo } from "@data/districts/districts-Ivanovo";
import { districtsIrkutsk } from "@data/districts/districts-Irkutsk";
import { districtsKaliningrad } from "@data/districts/districts-Kaliningrad";
import { districtsKaluga } from "@data/districts/districts-Kaluga";
import { districtsKemerovo } from "@data/districts/districts-Kemerovo";
import { districtsKirov } from "@data/districts/districts-Kirov";
import { districtsKostroma } from "@data/districts/districts-Kostroma";
import { districtsKurgan } from "@data/districts/districts-Kurgan";
import { districtsKursk } from "@data/districts/districts-Kursk";
import { districtsLipetsk } from "@data/districts/districts-Lipetsk";
import { districtsMagadan } from "@data/districts/districts-Magadan";
import { districtsKrasnogorsk } from "@data/districts/districts-Krasnogorsk";
import { districtsMurmansk } from "@data/districts/districts-Murmansk";
import { districtsNizhnyNovgorod } from "@data/districts/districts-Nizhny-Novgorod";
import { districtsVelikyNovgorod } from "@data/districts/districts-Veliky-Novgorod";
import { districtsNovosibirsk } from "@data/districts/districts-Novosibirsk";
import { districtsOmsk } from "@data/districts/districts-Omsk";
import { districtsOrenburg } from "@data/districts/districts-Orenburg";
import { districtsOrel } from "@data/districts/districts-Orel";
import { districtsPenza } from "@data/districts/districts-Penza";
import { districtsPskov } from "@data/districts/districts-Pskov";
import { districtsRostov } from "@data/districts/districts-Rostov";
import { districtsRyazan } from "@data/districts/districts-Ryazan";
import { districtsSamara } from "@data/districts/districts-Samara";
import { districtsSaratov } from "@data/districts/districts-Saratov";
import { districtsYuzhnoSakhalinsk } from "@data/districts/districts-Yuzhno-Sakhalinsk";
import { districtsYekaterinburg } from "@data/districts/districts-Yekaterinburg";
import { districtsSmolensk } from "@data/districts/districts-Smolensk";
import { districtsTambov } from "@data/districts/districts-Tambov";
import { districtsTver } from "@data/districts/districts-Tver";
import { districtsSevastopol } from "@data/districts/districts-Sevastopol";
import { districtsNaryanMar } from "@data/districts/districts-Naryan-Mar";
import { districtsKhantyMansiysk } from "@data/districts/districts-Khanty-Mansiysk";
import { districtsAnadyr } from "@data/districts/districts-Anadyr";
import { districtsSalekhard } from "@data/districts/districts-Salekhard";
import { districtsMSK } from "@data/districts/districts-Msk";

export const getFindedObjectDistrictsList = (selectedArea) => {
  switch (true) {
    case selectedArea?.includes("Санкт-Петербург"):
      return districtsSPB;
    case selectedArea?.includes("Москва"):
      return districtsMSK;
    case selectedArea?.includes("Майкоп"):
      return districtsMaykop;
    case selectedArea?.includes("Уфа"):
      return districtsUfa;
    case selectedArea?.includes("Улан-Удэ"):
      return districtsUlanUde;
    case selectedArea?.includes("Сыктывкар"):
      return districtsSyktyvkar;
    case selectedArea?.includes("Горно-Алтайск"):
      return districtsGornoAltaysk;
    case selectedArea?.includes("Махачкала"):
      return districtsMahachkala;
    case selectedArea?.includes("Нальчик"):
      return districtsNalchik;
    case selectedArea?.includes("Элиста"):
      return districtsElista;
    case selectedArea?.includes("Черкесск"):
      return districtsCherkessk;
    case selectedArea?.includes("Петрозаводск"):
      return districtsPetrozavodsk;
    case selectedArea?.includes("Симферополь"):
      return districtsSimferopol;
    case selectedArea?.includes("Йошкар-Ола"):
      return districtsYoshkarOla;
    case selectedArea?.includes("Саранск"):
      return districtsSaransk;
    case selectedArea?.includes("Якутск"):
      return districtsYakutsk;
    case selectedArea?.includes("Владикавказ"):
      return districtsVladikavkaz;
    case selectedArea?.includes("Казань"):
      return districtsKazan;
    case selectedArea?.includes("Кызыл"):
      return districtsKizil;
    case selectedArea?.includes("Ижевск"):
      return districtsIzhevsk;
    case selectedArea?.includes("Абакан"):
      return districtsAbakan;
    case selectedArea?.includes("Грозный"):
      return districtsGrozny;
    case selectedArea?.includes("Чебоксары"):
      return districtsCheboksary;
    case selectedArea?.includes("Барнаул"):
      return districtsBarnaul;
    case selectedArea?.includes("Чита"):
      return districtsChita;
    case selectedArea?.includes("Петропавловск-Камчатский"):
      return districtsPetropavlovskKamchatsky;
    case selectedArea?.includes("Краснодар"):
      return districtsKrasnodar;
    case selectedArea?.includes("Красноярск"):
      return districtsKrasnoyarsk;
    case selectedArea?.includes("Пермь"):
      return districtsPerm;
    case selectedArea?.includes("Владивосток"):
      return districtsVladivostok;
    case selectedArea?.includes("Ставрополь"):
      return districtsStavropol;
    case selectedArea?.includes("Хабаровск"):
      return districtsKhabarovsk;
    case selectedArea?.includes("Благовещенск"):
      return districtsBlagoveshchensk;
    case selectedArea?.includes("Архангельск"):
      return districtsArkhangelsk;
    case selectedArea?.includes("Астрахань"):
      return districtsAstrakhan;
    case selectedArea?.includes("Белгород"):
      return districtsBelgorod;
    case selectedArea?.includes("Брянск"):
      return districtsBryansk;
    case selectedArea?.includes("Владимир"):
      return districtsVladimir;
    case selectedArea?.includes("Волгоград"):
      return districtsVolgograd;
    case selectedArea?.includes("Вологда"):
      return districtsVologda;
    case selectedArea?.includes("Воронеж"):
      return districtsVoronezh;
    case selectedArea?.includes("Иваново"):
      return districtsIvanovo;
    case selectedArea?.includes("Иркутск"):
      return districtsIrkutsk;
    case selectedArea?.includes("Калининград"):
      return districtsKaliningrad;
    case selectedArea?.includes("Калуга"):
      return districtsKaluga;
    case selectedArea?.includes("Кемерово"):
      return districtsKemerovo;
    case selectedArea?.includes("Киров"):
      return districtsKirov;
    case selectedArea?.includes("Кострома"):
      return districtsKostroma;
    case selectedArea?.includes("Курган"):
      return districtsKurgan;
    case selectedArea?.includes("Курск"):
      return districtsKursk;
    case selectedArea?.includes("Липецк"):
      return districtsLipetsk;
    case selectedArea?.includes("Магадан"):
      return districtsMagadan;
    case selectedArea?.includes("Красногорск"):
      return districtsKrasnogorsk;
    case selectedArea?.includes("Мурманск"):
      return districtsMurmansk;
    case selectedArea?.includes("Нижний Новгород"):
      return districtsNizhnyNovgorod;
    case selectedArea?.includes("Великий Новгород"):
      return districtsVelikyNovgorod;
    case selectedArea?.includes("Новосибирск"):
      return districtsNovosibirsk;
    case selectedArea?.includes("Омск"):
      return districtsOmsk;
    case selectedArea?.includes("Оренбург"):
      return districtsOrenburg;
    case selectedArea?.includes("Орёл"):
      return districtsOrel;
    case selectedArea?.includes("Пенза"):
      return districtsPenza;
    case selectedArea?.includes("Псков"):
      return districtsPskov;
    case selectedArea?.includes("Ростов-на-Дону"):
      return districtsRostov;
    case selectedArea?.includes("Рязань"):
      return districtsRyazan;
    case selectedArea?.includes("Самара"):
      return districtsSamara;
    case selectedArea?.includes("Саратов"):
      return districtsSaratov;
    case selectedArea?.includes("Южно-Сахалинск"):
      return districtsYuzhnoSakhalinsk;
    case selectedArea?.includes("Екатеринбург"):
      return districtsYekaterinburg;
    case selectedArea?.includes("Смоленск"):
      return districtsSmolensk;
    case selectedArea?.includes("Тамбов"):
      return districtsTambov;
    case selectedArea?.includes("Тверь"):
      return districtsTver;
    case selectedArea?.includes("Севастополь"):
      return districtsSevastopol;
    case selectedArea?.includes("Нарьян-Мар"):
      return districtsNaryanMar;
    case selectedArea?.includes("Ханты-Мансийск"):
      return districtsKhantyMansiysk;
    case selectedArea?.includes("Анадырь"):
      return districtsAnadyr;
    case selectedArea?.includes("Салехард"):
      return districtsSalekhard;
    default:
      return [];
  }
};

export const allDistrictsList = () => {
  return [
    ...districtsMSK,
    ...districtsSPB,
    ...districtsMaykop,
    ...districtsUfa,
    ...districtsUlanUde,
    ...districtsGornoAltaysk,
    ...districtsMahachkala,
    ...districtsNalchik,
    ...districtsElista,
    ...districtsCherkessk,
    ...districtsPetrozavodsk,
    ...districtsSyktyvkar,
    ...districtsSimferopol,
    ...districtsYoshkarOla,
    ...districtsSaransk,
    ...districtsYakutsk,
    ...districtsVladikavkaz,
    ...districtsKazan,
    ...districtsKizil,
    ...districtsIzhevsk,
    ...districtsAbakan,
    ...districtsGrozny,
    ...districtsCheboksary,
    ...districtsBarnaul,
    ...districtsChita,
    ...districtsPetropavlovskKamchatsky,
    ...districtsKrasnodar,
    ...districtsKrasnoyarsk,
    ...districtsPerm,
    ...districtsVladivostok,
    ...districtsStavropol,
    ...districtsKhabarovsk,
    ...districtsBlagoveshchensk,
    ...districtsArkhangelsk,
    ...districtsAstrakhan,
    ...districtsBelgorod,
    ...districtsBryansk,
    ...districtsVladimir,
    ...districtsVolgograd,
    ...districtsVologda,
    ...districtsVoronezh,
    ...districtsIvanovo,
    ...districtsIrkutsk,
    ...districtsKaliningrad,
    ...districtsKaluga,
    ...districtsKemerovo,
    ...districtsKirov,
    ...districtsKostroma,
    ...districtsKurgan,
    ...districtsKursk,
    ...districtsLipetsk,
    ...districtsMagadan,
    ...districtsKrasnogorsk,
    ...districtsMurmansk,
    ...districtsNizhnyNovgorod,
    ...districtsVelikyNovgorod,
    ...districtsNovosibirsk,
    ...districtsOmsk,
    ...districtsOrenburg,
    ...districtsOrel,
    ...districtsPenza,
    ...districtsPskov,
    ...districtsRostov,
    ...districtsRyazan,
    ...districtsSamara,
    ...districtsSaratov,
    ...districtsYuzhnoSakhalinsk,
    ...districtsYekaterinburg,
    ...districtsSmolensk,
    ...districtsTambov,
    ...districtsTver,
    ...districtsSevastopol,
    ...districtsNaryanMar,
    ...districtsKhantyMansiysk,
    ...districtsAnadyr,
    ...districtsSalekhard
  ];
};
