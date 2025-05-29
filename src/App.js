import "./css/defineFonts.css";
import "./App.css";
import WeatherMain from "./components/WeatherMain";
import { createTheme, ThemeProvider } from "@mui/material";

let theme = createTheme({
  typography: {
    fontFamily: ["Work Sans"],
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WeatherMain />
      </ThemeProvider>
    </div>
  );
}

export default App;
