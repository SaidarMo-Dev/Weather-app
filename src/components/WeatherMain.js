import { useTranslation } from "react-i18next";

// MATERIAL UI
import { Button, Container } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import { Card, CardContent, Typography } from "@mui/material";

// REACT
import { useEffect, useState } from "react";

// AXIOS
import axios from "axios";

// MOMET
import moment from "moment/moment";
import "moment/locale/ar";

let cancelAxios = null;

export default function WeatherMain() {
  const [weatherInfo, setWeatherInfo] = useState({});
  let [dateTime, setDateTime] = useState("");
  const { t, i18n } = useTranslation();

  const [locale, setLocale] = useState("en");

  useEffect(() => {
    moment.locale("en");
    i18n.changeLanguage("en");

    setDateTime(moment().format("MMMM Do YYYY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=33.233334&lon=-8.500000&appid=38655af75acbe85c48598ff7e452f57e",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const main = response.data.main;

        setWeatherInfo({
          temp: Math.round(main.temp - 272.2),
          maxTemp: Math.round(main.temp_max - 272.2),
          minTemp: Math.round(main.temp_min - 272.2),
          description: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  function handleChangeLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      moment.locale("ar");
      i18n.changeLanguage("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }

    setDateTime(moment().format("MMMM Do YYYY"));
  }

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"}>
      <Container maxWidth="sm">
        {/* Card */}
        <Card sx={{ background: "#3F51B5", color: "white", padding: "10px" }}>
          <CardContent>
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">{t("El Jadida")}</Typography>
              <Typography
                component="p"
                style={{ alignSelf: "flex-end", marginLeft: "20px" }}
              >
                {dateTime}
              </Typography>
            </div>
            <hr />
            {/* Header */}

            {/* Weather informations */}
            <div
              className="degr-description"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="description">
                {/* Temp Info */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <Typography variant="h1">
                    {weatherInfo.temp ?? "??"}
                  </Typography>
                  <img src={weatherInfo.icon} alt="Weather Icon" />
                </div>
                {/* Temp Info */}

                <div style={{ color: "white", textAlign: "left" }}>
                  {/* Description */}
                  <Typography variant="h5">
                    {t(weatherInfo.description ?? "Unknown")}
                  </Typography>
                  {/* Description */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                      fontSize: "14px",
                    }}
                  >
                    <span>
                      {t("min")}: {weatherInfo.minTemp ?? "?"}
                    </span>
                    <span
                      style={{
                        width: "2px",
                        height: "20px",
                        background: "white",
                        margin: "0 25px",
                      }}
                    ></span>
                    <span>
                      {" "}
                      {t("max")}: {weatherInfo.maxTemp ?? "?"}
                    </span>
                  </div>
                </div>
              </div>
              {/* weather Icon */}
              <div className="image">
                <CloudIcon sx={{ fontSize: "150px", color: "white" }} />
              </div>
              {/* weather Icon */}
            </div>

            {/* Weather informations */}
          </CardContent>
        </Card>
        {/* Card */}

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={handleChangeLanguageClick}
            style={{ color: "white", textTransform: "none" }}
          >
            {locale === "ar" ? "English" : "Arabic"}
          </Button>
        </div>
      </Container>
    </div>
  );
}
