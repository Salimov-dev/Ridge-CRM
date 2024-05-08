export type TokensFunction = (mode: string) => {
  green: {
    green: string;
    seaGreen: string;
    darkGreen: string;
    mediumSeaGreen: string;
  };
  sidebar: {
    menuItemActive: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  error: {
    red: string;
    gold: string;
  };
  header: {
    gold: string;
  };
  success: {
    mediumSeaGreen: string;
    darkGreen: string;
  };
  cancel: {
    fireBrick: string;
    red: string;
    indianRed: string;
    lightCoral: string;
  };
  task: {
    myTask: string;
    myTaskHover: string;
    managerTask: string;
    managerTaskHover: string;
  };
  lastContact: {
    primary: string;
    hover: string;
  };
  presentation: {
    primary: string;
    hover: string;
  };
  meeting: {
    primary: string;
    hover: string;
  };
  grey: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  primary: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  greenAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  redAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  blueAccent: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
};

export interface ITheme {
  palette: {
    mode: string;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    neutral: {
      dark: string;
      main: string;
      light: string;
    };
    background: {
      default: string;
    };
  };
  a: {
    color: string;
  };
  zIndex: {
    modal: number;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
    h2: {
      fontFamily: string;
      fontSize: number;
    };
    h3: {
      fontFamily: string;
      fontSize: number;
    };
    h4: {
      fontFamily: string;
      fontSize: number;
    };
    h5: {
      fontFamily: string;
      fontSize: number;
    };
    h6: {
      fontFamily: string;
      fontSize: number;
    };
  };
  green: {
    green: string;
    seaGreen: string;
    darkGreen: string;
    mediumSeaGreen: string;
  };
  grey: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}
