import { useRoutes } from "react-router-dom";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";

import theme from "src/theme";
import routes from "src/routes";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App = (): JSX.Element => {
  const routing = useRoutes(routes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
