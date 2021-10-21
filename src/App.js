import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { purple, red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Registeration from "./pages/Registeration";

function App() {
  const isDark = useSelector((state) => state.dark.isDark);

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

    typography: {
      fontFamily: "Quicksand",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
        <Route path="/register">
          <Registeration />
        </Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
