import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { purple, red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Registeration from "./pages/Registeration";
import { IntlProvider } from "react-intl";
import text from "./text";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import RTL from "./components/RTL";
import { BrowserRouter } from "react-router-dom";

function App() {
  const isDark = useSelector((state) => state.dark.isDark);
  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createMuiTheme({
    palette: isDark
      ? {
          type: "dark",
          primary: {
            main: "#787a78",
          },
          secondary: { main: "#f44336" },
          appBar: "#393b39",
          activeTile: "#373837",
          avatarIconHover: "#dee0e0",
        }
      : {
          type: "light",
          primary: {
            main: "#fefefe",
          },
          secondary: purple,
          appBar: "#fefefe",
          activeTile: "#f4f4f4",
          avatarIconHover: "#dbdbdb",
        },
    direction: `${language == "ar" ? "rtl" : "ltr"}`,
    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  return (
    <IntlProvider locale={language} messages={text[language]}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir={language == "ar" ? "rtl" : "ltr"}>
            <CssBaseline />
            <RTL>
              <BrowserRouter>
                <Layout>
                  <Switch>
                    <Route exact path="/">
                      <Notes />
                    </Route>
                    <Route exact path="/create">
                      <Create />
                    </Route>
                  </Switch>
                </Layout>
                <Route path="/register">
                  <Registeration />
                </Route>
              </BrowserRouter>
            </RTL>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </IntlProvider>
  );
}

export default App;
