import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, X, Sparkles, Loader2 } from "lucide-react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

export type VisitedCity = {
  nameTr: string;
  nameEn: string;
  lat: number;
  lng: number;
};

export type VisitedCountry = {
  id: string;
  nameTr: string;
  nameEn: string;
  lat: number;
  lng: number;
  flag: string;
  region: "avrupa" | "asya" | "amerika" | "afrika" | "ortadogu";
  cities?: VisitedCity[];
};

export const VISITED_COUNTRIES: VisitedCountry[] = [
  { id: "TR", nameTr: "Türkiye", nameEn: "Turkey", lat: 38.9637, lng: 35.2433, flag: "🇹🇷", region: "avrupa" },
  {
    id: "FR",
    nameTr: "Fransa",
    nameEn: "France",
    lat: 46.2276,
    lng: 2.2137,
    flag: "🇫🇷",
    region: "avrupa",
    cities: [
      { nameTr: "Paris", nameEn: "Paris", lat: 48.8566, lng: 2.3522 },
      { nameTr: "Lyon", nameEn: "Lyon", lat: 45.764, lng: 4.8357 },
      { nameTr: "Strazburg", nameEn: "Strasbourg", lat: 48.5734, lng: 7.7521 },
    ],
  },
  {
    id: "BE",
    nameTr: "Belçika",
    nameEn: "Belgium",
    lat: 50.5039,
    lng: 4.4699,
    flag: "🇧🇪",
    region: "avrupa",
    cities: [{ nameTr: "Brüksel", nameEn: "Brussels", lat: 50.8503, lng: 4.3517 }],
  },
  {
    id: "US",
    nameTr: "Amerika Birleşik Devletleri",
    nameEn: "United States",
    lat: 37.0902,
    lng: -95.7129,
    flag: "🇺🇸",
    region: "amerika",
    cities: [
      { nameTr: "New York", nameEn: "New York", lat: 40.7128, lng: -74.006 },
      { nameTr: "New Jersey", nameEn: "New Jersey", lat: 40.0583, lng: -74.4057 },
      { nameTr: "Orlando", nameEn: "Orlando", lat: 28.5383, lng: -81.3792 },
      { nameTr: "Tampa", nameEn: "Tampa", lat: 27.9506, lng: -82.4572 },
      { nameTr: "Miami", nameEn: "Miami", lat: 25.7617, lng: -80.1918 },
      { nameTr: "San Francisco", nameEn: "San Francisco", lat: 37.7749, lng: -122.4194 },
      { nameTr: "Columbus", nameEn: "Columbus", lat: 39.9612, lng: -82.9988 },
      { nameTr: "Los Angeles", nameEn: "Los Angeles", lat: 34.0522, lng: -118.2437 },
      { nameTr: "Atlanta", nameEn: "Atlanta", lat: 33.749, lng: -84.388 },
      { nameTr: "Chicago", nameEn: "Chicago", lat: 41.8781, lng: -87.6298 },
      { nameTr: "Washington", nameEn: "Washington", lat: 38.9072, lng: -77.0369 },
    ],
  },
  {
    id: "JP",
    nameTr: "Japonya",
    nameEn: "Japan",
    lat: 36.2048,
    lng: 138.2529,
    flag: "🇯🇵",
    region: "asya",
    cities: [{ nameTr: "Tokyo", nameEn: "Tokyo", lat: 35.6762, lng: 139.6503 }],
  },
  {
    id: "KR",
    nameTr: "Güney Kore",
    nameEn: "South Korea",
    lat: 35.9078,
    lng: 127.7669,
    flag: "🇰🇷",
    region: "asya",
    cities: [{ nameTr: "Seul", nameEn: "Seoul", lat: 37.5665, lng: 126.978 }],
  },
  {
    id: "MY",
    nameTr: "Malezya",
    nameEn: "Malaysia",
    lat: 4.2105,
    lng: 101.9758,
    flag: "🇲🇾",
    region: "asya",
    cities: [{ nameTr: "Kuala Lumpur", nameEn: "Kuala Lumpur", lat: 3.139, lng: 101.6869 }],
  },
  {
    id: "SG",
    nameTr: "Singapur",
    nameEn: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    flag: "🇸🇬",
    region: "asya",
    cities: [{ nameTr: "Singapur", nameEn: "Singapore", lat: 1.3521, lng: 103.8198 }],
  },
  {
    id: "DE",
    nameTr: "Almanya",
    nameEn: "Germany",
    lat: 51.1657,
    lng: 10.4515,
    flag: "🇩🇪",
    region: "avrupa",
    cities: [
      { nameTr: "Hamburg", nameEn: "Hamburg", lat: 53.5511, lng: 9.9937 },
      { nameTr: "Münih", nameEn: "Munich", lat: 48.1351, lng: 11.582 },
      { nameTr: "Köln", nameEn: "Cologne", lat: 50.9375, lng: 6.9603 },
      { nameTr: "Frankfurt", nameEn: "Frankfurt", lat: 50.1109, lng: 8.6821 },
    ],
  },
  {
    id: "ZA",
    nameTr: "Güney Afrika",
    nameEn: "South Africa",
    lat: -30.5595,
    lng: 22.9375,
    flag: "🇿🇦",
    region: "afrika",
    cities: [
      { nameTr: "Johannesburg", nameEn: "Johannesburg", lat: -26.2041, lng: 28.0473 },
      { nameTr: "Cape Town", nameEn: "Cape Town", lat: -33.9249, lng: 18.4241 },
    ],
  },
  {
    id: "MA",
    nameTr: "Fas",
    nameEn: "Morocco",
    lat: 31.7917,
    lng: -7.0926,
    flag: "🇲🇦",
    region: "afrika",
    cities: [
      { nameTr: "Kazablanka", nameEn: "Casablanca", lat: 33.5731, lng: -7.5898 },
      { nameTr: "Rabat", nameEn: "Rabat", lat: 34.0209, lng: -6.8416 },
    ],
  },
  {
    id: "FI",
    nameTr: "Finlandiya",
    nameEn: "Finland",
    lat: 61.9241,
    lng: 25.7482,
    flag: "🇫🇮",
    region: "avrupa",
    cities: [{ nameTr: "Helsinki", nameEn: "Helsinki", lat: 60.1699, lng: 24.9384 }],
  },
  {
    id: "IT",
    nameTr: "İtalya",
    nameEn: "Italy",
    lat: 43.2,
    lng: 12.0,
    flag: "🇮🇹",
    region: "avrupa",
    cities: [
      { nameTr: "Roma", nameEn: "Rome", lat: 41.9028, lng: 12.4964 },
      { nameTr: "Milano", nameEn: "Milan", lat: 45.4642, lng: 9.19 },
      { nameTr: "Floransa", nameEn: "Florence", lat: 43.7696, lng: 11.2558 },
      { nameTr: "Rimini", nameEn: "Rimini", lat: 44.0678, lng: 12.5695 },
    ],
  },
  {
    id: "ES",
    nameTr: "İspanya",
    nameEn: "Spain",
    lat: 40.4637,
    lng: -3.7492,
    flag: "🇪🇸",
    region: "avrupa",
    cities: [
      { nameTr: "Madrid", nameEn: "Madrid", lat: 40.4168, lng: -3.7038 },
      { nameTr: "Barselona", nameEn: "Barcelona", lat: 41.3851, lng: 2.1734 },
    ],
  },
  {
    id: "SD",
    nameTr: "Sudan",
    nameEn: "Sudan",
    lat: 12.8628,
    lng: 30.2176,
    flag: "🇸🇩",
    region: "afrika",
    cities: [{ nameTr: "Hartum", nameEn: "Khartoum", lat: 15.5007, lng: 32.5599 }],
  },
  {
    id: "CH",
    nameTr: "İsviçre",
    nameEn: "Switzerland",
    lat: 46.8182,
    lng: 8.2275,
    flag: "🇨🇭",
    region: "avrupa",
    cities: [
      { nameTr: "Bern", nameEn: "Bern", lat: 46.948, lng: 7.4474 },
      { nameTr: "Cenevre", nameEn: "Geneva", lat: 46.2044, lng: 6.1432 },
      { nameTr: "Zürih", nameEn: "Zurich", lat: 47.3769, lng: 8.5417 },
      { nameTr: "Montrö", nameEn: "Montreux", lat: 46.4312, lng: 6.9107 },
      { nameTr: "Basel", nameEn: "Basel", lat: 47.5596, lng: 7.5886 },
      { nameTr: "Lozan", nameEn: "Lausanne", lat: 46.5197, lng: 6.6323 },
    ],
  },
  {
    id: "HR",
    nameTr: "Hırvatistan",
    nameEn: "Croatia",
    lat: 45.1,
    lng: 15.2,
    flag: "🇭🇷",
    region: "avrupa",
    cities: [
      { nameTr: "Zagreb", nameEn: "Zagreb", lat: 45.815, lng: 15.9819 },
      { nameTr: "Pula", nameEn: "Pula", lat: 44.8683, lng: 13.8481 },
      { nameTr: "Dubrovnik", nameEn: "Dubrovnik", lat: 42.6507, lng: 18.0944 },
    ],
  },
  {
    id: "GB",
    nameTr: "Birleşik Krallık",
    nameEn: "United Kingdom",
    lat: 55.3781,
    lng: -3.436,
    flag: "🇬🇧",
    region: "avrupa",
    cities: [{ nameTr: "Londra", nameEn: "London", lat: 51.5074, lng: -0.1278 }],
  },
  {
    id: "BA",
    nameTr: "Bosna-Hersek",
    nameEn: "Bosnia and Herzegovina",
    lat: 43.9159,
    lng: 17.6791,
    flag: "🇧🇦",
    region: "avrupa",
    cities: [
      { nameTr: "Saraybosna", nameEn: "Sarajevo", lat: 43.8563, lng: 18.4131 },
      { nameTr: "Mostar", nameEn: "Mostar", lat: 43.3438, lng: 17.8078 },
      { nameTr: "Zenica", nameEn: "Zenica", lat: 44.2034, lng: 17.9077 },
      { nameTr: "Bihać", nameEn: "Bihac", lat: 44.8169, lng: 15.8708 },
      { nameTr: "Tuzla", nameEn: "Tuzla", lat: 44.5384, lng: 18.6733 },
    ],
  },
  {
    id: "SY",
    nameTr: "Suriye",
    nameEn: "Syria",
    lat: 34.8021,
    lng: 38.9968,
    flag: "🇸🇾",
    region: "ortadogu",
    cities: [{ nameTr: "Şam", nameEn: "Damascus", lat: 33.5138, lng: 36.2765 }],
  },
  {
    id: "SA",
    nameTr: "Suudi Arabistan",
    nameEn: "Saudi Arabia",
    lat: 23.8859,
    lng: 45.0792,
    flag: "🇸🇦",
    region: "ortadogu",
    cities: [
      { nameTr: "Cidde", nameEn: "Jeddah", lat: 21.5433, lng: 39.1728 },
      { nameTr: "Riyad", nameEn: "Riyadh", lat: 24.7136, lng: 46.6753 },
      { nameTr: "Mekke", nameEn: "Mecca", lat: 21.3891, lng: 39.8579 },
      { nameTr: "Medine", nameEn: "Medina", lat: 24.5247, lng: 39.5692 },
    ],
  },
  {
    id: "IQ",
    nameTr: "Irak",
    nameEn: "Iraq",
    lat: 33.2232,
    lng: 43.6793,
    flag: "🇮🇶",
    region: "ortadogu",
    cities: [{ nameTr: "Bağdat", nameEn: "Baghdad", lat: 33.3152, lng: 44.3661 }],
  },
  {
    id: "BG",
    nameTr: "Bulgaristan",
    nameEn: "Bulgaria",
    lat: 42.7339,
    lng: 25.4858,
    flag: "🇧🇬",
    region: "avrupa",
    cities: [
      { nameTr: "Sofya", nameEn: "Sofia", lat: 42.6977, lng: 23.3219 },
      { nameTr: "Varna", nameEn: "Varna", lat: 43.2141, lng: 27.9147 },
    ],
  },
  {
    id: "CN",
    nameTr: "Çin",
    nameEn: "China",
    lat: 35.8617,
    lng: 104.1954,
    flag: "🇨🇳",
    region: "asya",
    cities: [
      { nameTr: "Pekin", nameEn: "Beijing", lat: 39.9042, lng: 116.4074 },
      { nameTr: "Şenyang", nameEn: "Shenyang", lat: 41.8057, lng: 123.4315 },
      { nameTr: "Şenzen", nameEn: "Shenzhen", lat: 22.5431, lng: 114.0579 },
      { nameTr: "Şanghay", nameEn: "Shanghai", lat: 31.2304, lng: 121.4737 },
      { nameTr: "Guangzhou", nameEn: "Guangzhou", lat: 23.1291, lng: 113.2644 },
    ],
  },
  {
    id: "KZ",
    nameTr: "Kazakistan",
    nameEn: "Kazakhstan",
    lat: 48.0196,
    lng: 66.9237,
    flag: "🇰🇿",
    region: "asya",
    cities: [{ nameTr: "Almatı", nameEn: "Almaty", lat: 43.222, lng: 76.8512 }],
  },
  {
    id: "HK",
    nameTr: "Hong Kong",
    nameEn: "Hong Kong SAR China",
    lat: 22.3193,
    lng: 114.1694,
    flag: "🇭🇰",
    region: "asya",
    cities: [{ nameTr: "Hong Kong", nameEn: "Hong Kong", lat: 22.3193, lng: 114.1694 }],
  },
  {
    id: "NO",
    nameTr: "Norveç",
    nameEn: "Norway",
    lat: 60.472,
    lng: 8.4689,
    flag: "🇳🇴",
    region: "avrupa",
    cities: [{ nameTr: "Oslo", nameEn: "Oslo", lat: 59.9139, lng: 10.7522 }],
  },
  {
    id: "SE",
    nameTr: "İsveç",
    nameEn: "Sweden",
    lat: 60.1282,
    lng: 18.6435,
    flag: "🇸🇪",
    region: "avrupa",
    cities: [
      { nameTr: "Stockholm", nameEn: "Stockholm", lat: 59.3293, lng: 18.0686 },
      { nameTr: "Göteborg", nameEn: "Gothenburg", lat: 57.7089, lng: 11.9746 },
      { nameTr: "Malmö", nameEn: "Malmo", lat: 55.605, lng: 13.0038 },
      { nameTr: "Uppsala", nameEn: "Uppsala", lat: 59.8586, lng: 17.6389 },
    ],
  },
  {
    id: "DK",
    nameTr: "Danimarka",
    nameEn: "Denmark",
    lat: 56.2639,
    lng: 9.5018,
    flag: "🇩🇰",
    region: "avrupa",
    cities: [{ nameTr: "Kopenhag", nameEn: "Copenhagen", lat: 55.6761, lng: 12.5683 }],
  },
  {
    id: "HU",
    nameTr: "Macaristan",
    nameEn: "Hungary",
    lat: 47.1625,
    lng: 19.5033,
    flag: "🇭🇺",
    region: "avrupa",
    cities: [{ nameTr: "Budapeşte", nameEn: "Budapest", lat: 47.4979, lng: 19.0402 }],
  },
  {
    id: "EG",
    nameTr: "Mısır",
    nameEn: "Egypt",
    lat: 26.8206,
    lng: 30.8025,
    flag: "🇪🇬",
    region: "afrika",
    cities: [{ nameTr: "İskenderiye", nameEn: "Alexandria", lat: 31.2001, lng: 29.9187 }],
  },
  {
    id: "CA",
    nameTr: "Kanada",
    nameEn: "Canada",
    lat: 56.1304,
    lng: -106.3468,
    flag: "🇨🇦",
    region: "amerika",
    cities: [
      { nameTr: "Ottawa", nameEn: "Ottawa", lat: 45.4215, lng: -75.6972 },
      { nameTr: "Calgary", nameEn: "Calgary", lat: 51.0447, lng: -114.0719 },
      { nameTr: "Toronto", nameEn: "Toronto", lat: 43.6532, lng: -79.3832 },
    ],
  },
  {
    id: "CY",
    nameTr: "Kıbrıs",
    nameEn: "Cyprus",
    lat: 35.1264,
    lng: 33.4299,
    flag: "🇨🇾",
    region: "avrupa",
    cities: [
      { nameTr: "Lefkoşa", nameEn: "Nicosia", lat: 35.1856, lng: 33.3823 },
      { nameTr: "Girne", nameEn: "Kyrenia", lat: 35.3364, lng: 33.3174 },
      { nameTr: "Gazimağusa", nameEn: "Famagusta", lat: 35.125, lng: 33.9382 },
      { nameTr: "Karpaz", nameEn: "Karpas", lat: 35.5412, lng: 34.3644 },
      { nameTr: "Güzelyurt", nameEn: "Morphou", lat: 35.1989, lng: 32.9928 },
      { nameTr: "İskele", nameEn: "Trikomo", lat: 35.2861, lng: 33.8903 },
      { nameTr: "Lefke", nameEn: "Lefka", lat: 35.1114, lng: 32.8497 },
    ],
  },
  { id: "KW", nameTr: "Kuveyt", nameEn: "Kuwait", lat: 29.3117, lng: 47.4818, flag: "🇰🇼", region: "ortadogu" },
  {
    id: "RS",
    nameTr: "Sırbistan",
    nameEn: "Serbia",
    lat: 44.0165,
    lng: 21.0059,
    flag: "🇷🇸",
    region: "avrupa",
    cities: [
      { nameTr: "Belgrad", nameEn: "Belgrade", lat: 44.7866, lng: 20.4489 },
      { nameTr: "Novi Sad", nameEn: "Novi Sad", lat: 45.2671, lng: 19.8335 },
    ],
  },
  {
    id: "TZ",
    nameTr: "Tanzanya",
    nameEn: "Tanzania",
    lat: -6.369,
    lng: 34.8888,
    flag: "🇹🇿",
    region: "afrika",
    cities: [
      { nameTr: "Zanzibar", nameEn: "Zanzibar", lat: -6.1659, lng: 39.2026 },
      { nameTr: "Darüsselam", nameEn: "Dar es Salaam", lat: -6.7924, lng: 39.2083 },
    ],
  },
  {
    id: "TH",
    nameTr: "Tayland",
    nameEn: "Thailand",
    lat: 15.87,
    lng: 100.9925,
    flag: "🇹🇭",
    region: "asya",
    cities: [{ nameTr: "Bangkok", nameEn: "Bangkok", lat: 13.7563, lng: 100.5018 }],
  },
  {
    id: "UA",
    nameTr: "Ukrayna",
    nameEn: "Ukraine",
    lat: 48.3794,
    lng: 31.1656,
    flag: "🇺🇦",
    region: "avrupa",
    cities: [
      { nameTr: "Kiev", nameEn: "Kyiv", lat: 50.4501, lng: 30.5234 },
      { nameTr: "Odesa", nameEn: "Odesa", lat: 46.4825, lng: 30.7233 },
    ],
  },
  {
    id: "JO",
    nameTr: "Ürdün",
    nameEn: "Jordan",
    lat: 30.5852,
    lng: 36.2384,
    flag: "🇯🇴",
    region: "ortadogu",
    cities: [{ nameTr: "Amman", nameEn: "Amman", lat: 31.9454, lng: 35.9284 }],
  },
  {
    id: "OM",
    nameTr: "Umman",
    nameEn: "Oman",
    lat: 21.5126,
    lng: 55.9233,
    flag: "🇴🇲",
    region: "ortadogu",
    cities: [{ nameTr: "Maskat", nameEn: "Muscat", lat: 23.588, lng: 58.3829 }],
  },
  { id: "VA", nameTr: "Vatikan", nameEn: "Vatican City", lat: 41.9029, lng: 12.4534, flag: "🇻🇦", region: "avrupa" },
  {
    id: "AR",
    nameTr: "Arjantin",
    nameEn: "Argentina",
    lat: -38.4161,
    lng: -63.6167,
    flag: "🇦🇷",
    region: "amerika",
    cities: [{ nameTr: "Buenos Aires", nameEn: "Buenos Aires", lat: -34.6037, lng: -58.3816 }],
  },
  {
    id: "AL",
    nameTr: "Arnavutluk",
    nameEn: "Albania",
    lat: 41.1533,
    lng: 20.1683,
    flag: "🇦🇱",
    region: "avrupa",
    cities: [{ nameTr: "Tiran", nameEn: "Tirana", lat: 41.3275, lng: 19.8187 }],
  },
  {
    id: "AT",
    nameTr: "Avusturya",
    nameEn: "Austria",
    lat: 47.5162,
    lng: 14.5501,
    flag: "🇦🇹",
    region: "avrupa",
    cities: [{ nameTr: "Viyana", nameEn: "Vienna", lat: 48.2082, lng: 16.3738 }],
  },
  {
    id: "AZ",
    nameTr: "Azerbaycan",
    nameEn: "Azerbaijan",
    lat: 40.1431,
    lng: 47.5769,
    flag: "🇦🇿",
    region: "asya",
    cities: [{ nameTr: "Bakü", nameEn: "Baku", lat: 40.4093, lng: 49.8671 }],
  },
  {
    id: "BR",
    nameTr: "Brezilya",
    nameEn: "Brazil",
    lat: -14.235,
    lng: -51.9253,
    flag: "🇧🇷",
    region: "amerika",
    cities: [
      { nameTr: "Rio de Janeiro", nameEn: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
      { nameTr: "São Paulo", nameEn: "São Paulo", lat: -23.5505, lng: -46.6333 },
    ],
  },
  {
    id: "CZ",
    nameTr: "Çekya",
    nameEn: "Czech Republic",
    lat: 49.8175,
    lng: 15.473,
    flag: "🇨🇿",
    region: "avrupa",
    cities: [{ nameTr: "Prag", nameEn: "Prague", lat: 50.0755, lng: 14.4378 }],
  },
  {
    id: "NL",
    nameTr: "Hollanda",
    nameEn: "Netherlands",
    lat: 52.1326,
    lng: 5.2913,
    flag: "🇳🇱",
    region: "avrupa",
    cities: [
      { nameTr: "Amsterdam", nameEn: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      { nameTr: "Rotterdam", nameEn: "Rotterdam", lat: 51.9244, lng: 4.4777 },
    ],
  },
  {
    id: "ID",
    nameTr: "Endonezya",
    nameEn: "Indonesia",
    lat: -0.7893,
    lng: 113.9213,
    flag: "🇮🇩",
    region: "asya",
    cities: [{ nameTr: "Cakarta", nameEn: "Jakarta", lat: -6.2088, lng: 106.8456 }],
  },
  { id: "AZORES", nameTr: "Azor Adaları (Portekiz)", nameEn: "Azores (Portugal)", lat: 37.7412, lng: -25.6756, flag: "🇵🇹", region: "avrupa" },
  {
    id: "RO",
    nameTr: "Romanya",
    nameEn: "Romania",
    lat: 45.9432,
    lng: 24.9668,
    flag: "🇷🇴",
    region: "avrupa",
    cities: [{ nameTr: "Bükreş", nameEn: "Bucharest", lat: 44.4323, lng: 26.1063 }],
  },
  {
    id: "SK",
    nameTr: "Slovakya",
    nameEn: "Slovakia",
    lat: 48.669,
    lng: 19.699,
    flag: "🇸🇰",
    region: "avrupa",
    cities: [{ nameTr: "Bratislava", nameEn: "Bratislava", lat: 48.1486, lng: 17.1077 }],
  },
  {
    id: "GR",
    nameTr: "Yunanistan",
    nameEn: "Greece",
    lat: 39.0742,
    lng: 21.8243,
    flag: "🇬🇷",
    region: "avrupa",
    cities: [
      { nameTr: "Atina", nameEn: "Athens", lat: 37.9838, lng: 23.7275 },
      { nameTr: "Selanik", nameEn: "Thessaloniki", lat: 40.6401, lng: 22.9444 },
      { nameTr: "Kavala", nameEn: "Kavala", lat: 40.9376, lng: 24.4131 },
      { nameTr: "İskeçe", nameEn: "Xanthi", lat: 41.1349, lng: 24.888 },
      { nameTr: "Zafer", nameEn: "Toxotes (Zafer)", lat: 41.0886, lng: 24.7836 },
      { nameTr: "Gümülcine", nameEn: "Komotini", lat: 41.1189, lng: 25.4042 },
    ],
  },
  {
    id: "PS",
    nameTr: "Filistin",
    nameEn: "Palestine",
    lat: 31.9522,
    lng: 35.2332,
    flag: "🇵🇸",
    region: "ortadogu",
    cities: [{ nameTr: "Kudüs", nameEn: "Jerusalem", lat: 31.7683, lng: 35.2137 }],
  },
  {
    id: "AE",
    nameTr: "Birleşik Arap Emirlikleri",
    nameEn: "United Arab Emirates",
    lat: 23.4241,
    lng: 53.8478,
    flag: "🇦🇪",
    region: "ortadogu",
    cities: [{ nameTr: "Dubai", nameEn: "Dubai", lat: 25.2048, lng: 55.2708 }],
  },
  {
    id: "MK",
    nameTr: "Kuzey Makedonya",
    nameEn: "North Macedonia",
    lat: 41.6086,
    lng: 21.7453,
    flag: "🇲🇰",
    region: "avrupa",
    cities: [
      { nameTr: "Üsküp", nameEn: "Skopje", lat: 41.9981, lng: 21.4254 },
      { nameTr: "Ohri", nameEn: "Ohrid", lat: 41.1172, lng: 20.8016 },
      { nameTr: "Bitola", nameEn: "Bitola", lat: 41.0319, lng: 21.3347 },
      { nameTr: "Tetova", nameEn: "Tetovo", lat: 42.0097, lng: 20.9714 },
      { nameTr: "Struga", nameEn: "Struga", lat: 41.1778, lng: 20.6783 },
    ],
  },
  {
    id: "XK",
    nameTr: "Kosova",
    nameEn: "Kosovo",
    lat: 42.6026,
    lng: 20.903,
    flag: "🇽🇰",
    region: "avrupa",
    cities: [
      { nameTr: "Priştine", nameEn: "Pristina", lat: 42.6629, lng: 21.1655 },
      { nameTr: "Prizren", nameEn: "Prizren", lat: 42.2153, lng: 20.7415 },
    ],
  },
  { id: "PT", nameTr: "Portekiz", nameEn: "Portugal", lat: 39.3999, lng: -8.2245, flag: "🇵🇹", region: "avrupa" },
  { id: "SM", nameTr: "San Marino", nameEn: "San Marino", lat: 43.9424, lng: 12.4578, flag: "🇸🇲", region: "avrupa" },
  {
    id: "RU",
    nameTr: "Rusya",
    nameEn: "Russia",
    lat: 61.524,
    lng: 105.3188,
    flag: "🇷🇺",
    region: "avrupa",
    cities: [
      { nameTr: "Tataristan (Kazan)", nameEn: "Tatarstan (Kazan)", lat: 55.8304, lng: 49.0661 },
    ],
  },
  {
    id: "TATARSTAN",
    nameTr: "Tataristan (Kazan)",
    nameEn: "Tatarstan (Kazan)",
    lat: 55.8304,
    lng: 49.0661,
    flag: "🟢🔴",
    region: "avrupa",
    cities: [{ nameTr: "Kazan", nameEn: "Kazan", lat: 55.8304, lng: 49.0661 }],
  },
];

// Dünya üzerindeki tüm GeoJSON ülke isimlerinin Türkçe karşılıkları ve bayrakları
const COUNTRY_INFO_MAP: Record<string, { tr: string; flag: string }> = {
  "Russia": { tr: "Rusya", flag: "🇷🇺" },
  "Canada": { tr: "Kanada", flag: "🇨🇦" },
  "United States of America": { tr: "ABD", flag: "🇺🇸" },
  "China": { tr: "Çin", flag: "🇨🇳" },
  "Brazil": { tr: "Brezilya", flag: "🇧🇷" },
  "Australia": { tr: "Avustralya", flag: "🇦🇺" },
  "India": { tr: "Hindistan", flag: "🇮🇳" },
  "Argentina": { tr: "Arjantin", flag: "🇦🇷" },
  "Kazakhstan": { tr: "Kazakistan", flag: "🇰🇿" },
  "Algeria": { tr: "Cezayir", flag: "🇩🇿" },
  "DR Congo": { tr: "Kongo DC", flag: "🇨🇩" },
  "Greenland": { tr: "Grönland", flag: "🇬🇱" },
  "Saudi Arabia": { tr: "Suudi Arabistan", flag: "🇸🇦" },
  "Mexico": { tr: "Meksika", flag: "🇲🇽" },
  "Indonesia": { tr: "Endonezya", flag: "🇮🇩" },
  "Sudan": { tr: "Sudan", flag: "🇸🇩" },
  "Libya": { tr: "Libya", flag: "🇱🇾" },
  "Iran": { tr: "İran", flag: "🇮🇷" },
  "Mongolia": { tr: "Moğolistan", flag: "🇲🇳" },
  "Peru": { tr: "Peru", flag: "🇵🇪" },
  "Chad": { tr: "Çad", flag: "🇹🇩" },
  "Niger": { tr: "Nijer", flag: "🇳🇪" },
  "Angola": { tr: "Angola", flag: "🇦🇴" },
  "Mali": { tr: "Mali", flag: "🇲🇱" },
  "South Africa": { tr: "Güney Afrika", flag: "🇿🇦" },
  "Colombia": { tr: "Kolombiya", flag: "🇨🇴" },
  "Ethiopia": { tr: "Etiyopya", flag: "🇪🇹" },
  "Bolivia": { tr: "Bolivya", flag: "🇧🇴" },
  "Mauritania": { tr: "Moritanya", flag: "🇲🇷" },
  "Egypt": { tr: "Mısır", flag: "🇪🇬" },
  "Tanzania": { tr: "Tanzanya", flag: "🇹🇿" },
  "Nigeria": { tr: "Nijerya", flag: "🇳🇬" },
  "Venezuela": { tr: "Venezuela", flag: "🇻🇪" },
  "Namibia": { tr: "Namibya", flag: "🇳🇦" },
  "Pakistan": { tr: "Pakistan", flag: "🇵🇰" },
  "Mozambique": { tr: "Mozambik", flag: "🇲🇿" },
  "Turkey": { tr: "Türkiye", flag: "🇹🇷" },
  "Chile": { tr: "Şili", flag: "🇨🇱" },
  "Zambia": { tr: "Zambiya", flag: "🇿🇲" },
  "Myanmar": { tr: "Myanmar", flag: "🇲🇲" },
  "Afghanistan": { tr: "Afganistan", flag: "🇦🇫" },
  "Somalia": { tr: "Somali", flag: "🇸🇴" },
  "France": { tr: "Fransa", flag: "🇫🇷" },
  "Central African Rep.": { tr: "Orta Afrika Cum.", flag: "🇨🇫" },
  "Ukraine": { tr: "Ukrayna", flag: "🇺🇦" },
  "Madagascar": { tr: "Madagaskar", flag: "🇲🇬" },
  "Botswana": { tr: "Botsvana", flag: "🇧🇼" },
  "Kenya": { tr: "Kenya", flag: "🇰🇪" },
  "Yemen": { tr: "Yemen", flag: "🇾🇪" },
  "Thailand": { tr: "Tayland", flag: "🇹🇭" },
  "Spain": { tr: "İspanya", flag: "🇪🇸" },
  "Turkmenistan": { tr: "Türkmenistan", flag: "🇹🇲" },
  "Cameroon": { tr: "Kamerun", flag: "🇨🇲" },
  "Papua New Guinea": { tr: "Papua Yeni Gine", flag: "🇵🇬" },
  "Sweden": { tr: "İsveç", flag: "🇸🇪" },
  "Uzbekistan": { tr: "Özbekistan", flag: "🇺🇿" },
  "Morocco": { tr: "Fas", flag: "🇲🇦" },
  "Iraq": { tr: "Irak", flag: "🇮🇶" },
  "Japan": { tr: "Japonya", flag: "🇯🇵" },
  "Paraguay": { tr: "Paraguay", flag: "🇵🇾" },
  "Zimbabwe": { tr: "Zimbabve", flag: "🇿🇼" },
  "Norway": { tr: "Norveç", flag: "🇳🇴" },
  "Finland": { tr: "Finlandiya", flag: "🇫🇮" },
  "Malaysia": { tr: "Malezya", flag: "🇲🇾" },
  "Vietnam": { tr: "Vietnam", flag: "🇻🇳" },
  "Congo": { tr: "Kongo", flag: "🇨🇬" },
  "Ivory Coast": { tr: "Fildişi Sahili", flag: "🇨🇮" },
  "Poland": { tr: "Polonya", flag: "🇵🇱" },
  "Oman": { tr: "Umman", flag: "🇴🇲" },
  "Italy": { tr: "İtalya", flag: "🇮🇹" },
  "Philippines": { tr: "Filipinler", flag: "🇵🇭" },
  "Ecuador": { tr: "Ekvador", flag: "🇪🇨" },
  "Burkina Faso": { tr: "Burkina Faso", flag: "🇧🇫" },
  "New Zealand": { tr: "Yeni Zelanda", flag: "🇳🇿" },
  "Gabon": { tr: "Gabon", flag: "🇬🇦" },
  "Guinea": { tr: "Gine", flag: "🇬🇳" },
  "United Kingdom": { tr: "Birleşik Krallık", flag: "🇬🇧" },
  "Uganda": { tr: "Uganda", flag: "🇺🇬" },
  "Ghana": { tr: "Gana", flag: "🇬🇭" },
  "Romania": { tr: "Romanya", flag: "🇷🇴" },
  "Laos": { tr: "Laos", flag: "🇱🇦" },
  "Guyana": { tr: "Guyana", flag: "🇬🇾" },
  "Belarus": { tr: "Belarus", flag: "🇧🇾" },
  "Kyrgyzstan": { tr: "Kırgızistan", flag: "🇰🇬" },
  "Senegal": { tr: "Senegal", flag: "🇸🇳" },
  "Syria": { tr: "Suriye", flag: "🇸🇾" },
  "Cambodia": { tr: "Kamboçya", flag: "🇰🇭" },
  "Uruguay": { tr: "Uruguay", flag: "🇺🇾" },
  "Suriname": { tr: "Surinam", flag: "🇸🇷" },
  "Tunisia": { tr: "Tunus", flag: "🇹🇳" },
  "Nepal": { tr: "Nepal", flag: "🇳🇵" },
  "Bangladesh": { tr: "Bangladeş", flag: "🇧🇩" },
  "Tajikistan": { tr: "Tacikistan", flag: "🇹🇯" },
  "Greece": { tr: "Yunanistan", flag: "🇬🇷" },
  "Nicaragua": { tr: "Nikaragua", flag: "🇳🇮" },
  "North Korea": { tr: "Kuzey Kore", flag: "🇰🇵" },
  "Malawi": { tr: "Malavi", flag: "🇲🇼" },
  "Eritrea": { tr: "Eritre", flag: "🇪🇷" },
  "Benin": { tr: "Benin", flag: "🇧🇯" },
  "Liberia": { tr: "Liberya", flag: "🇱🇷" },
  "South Korea": { tr: "Güney Kore", flag: "🇰🇷" },
  "Hungary": { tr: "Macaristan", flag: "🇭🇺" },
  "Portugal": { tr: "Portekiz", flag: "🇵🇹" },
  "Jordan": { tr: "Ürdün", flag: "🇯🇴" },
  "Serbia": { tr: "Sırbistan", flag: "🇷🇸" },
  "Azerbaijan": { tr: "Azerbaycan", flag: "🇦🇿" },
  "Austria": { tr: "Avusturya", flag: "🇦🇹" },
  "Czechia": { tr: "Çekya", flag: "🇨🇿" },
  "Czech Rep.": { tr: "Çekya", flag: "🇨🇿" },
  "Georgia": { tr: "Gürcistan", flag: "🇬🇪" },
  "Ireland": { tr: "İrlanda", flag: "🇮🇪" },
  "Sierra Leone": { tr: "Sierra Leone", flag: "🇸🇱" },
  "Lithuania": { tr: "Litvanya", flag: "🇱🇹" },
  "Latvia": { tr: "Letonya", flag: "🇱🇻" },
  "Croatia": { tr: "Hırvatistan", flag: "🇭🇷" },
  "Bosnia and Herz.": { tr: "Bosna-Hersek", flag: "🇧🇦" },
  "Slovakia": { tr: "Slovakya", flag: "🇸🇰" },
  "Estonia": { tr: "Estonya", flag: "🇪🇪" },
  "Denmark": { tr: "Danimarka", flag: "🇩🇰" },
  "Netherlands": { tr: "Hollanda", flag: "🇳🇱" },
  "Switzerland": { tr: "İsviçre", flag: "🇨🇭" },
  "Belgium": { tr: "Belçika", flag: "🇧🇪" },
  "Albania": { tr: "Arnavutluk", flag: "🇦🇱" },
  "North Macedonia": { tr: "Kuzey Makedonya", flag: "🇲🇰" },
  "Slovenia": { tr: "Slovenya", flag: "🇸🇮" },
  "Montenegro": { tr: "Karadağ", flag: "🇲🇪" },
  "Bulgaria": { tr: "Bulgaristan", flag: "🇧🇬" },
  "Kosovo": { tr: "Kosova", flag: "🇽🇰" },
  "Dem. Rep. Korea": { tr: "Kuzey Kore", flag: "🇰🇵" },
  "Korea, Dem. People's Rep. of": { tr: "Kuzey Kore", flag: "🇰🇵" },
  "Cyprus": { tr: "Kıbrıs", flag: "🇨🇾" },
  "Iceland": { tr: "İzlanda", flag: "🇮🇸" },
};

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;

export function CollaborationsSection({ lang }: { lang: "tr" | "en" }) {
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountry | null>(null);
  const [hoverCountry, setHoverCountry] = useState<VisitedCountry | null>(null);
  const [hoverFeatureName, setHoverFeatureName] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [geographies, setGeographies] = useState<any[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [manualZoom, setManualZoom] = useState(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Bölgelere özel 3D Zoom ve Odaklama (Scale & Center) Ayarları
  const REGION_CONFIGS: Record<string, { scale: number; center: [number, number] }> = {
    all: { scale: 145, center: [0, 25] },
    avrupa: { scale: 420, center: [15, 52] },
    asya: { scale: 220, center: [85, 30] },
    ortadogu: { scale: 580, center: [45, 23] },
    afrika: { scale: 260, center: [20, 2] },
    amerika: { scale: 180, center: [-75, 10] },
  };

  // Bölge veya Arama değişince Manuel Zoom ve Pan'i Sıfırla
  useEffect(() => {
    setManualZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, [activeRegion, searchQuery]);

  // d3-geo mercator projeksiyonu (Arama, Bölge ve Manuel Zoom/Pan)
  const projection = useMemo(() => {
    let scaleMultiplier = manualZoom;
    let baseScale = 145;
    let centerCoords: [number, number] = [0, 25];

    // Eğer arama kutusunda yazı varsa
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      const matchedVisited = VISITED_COUNTRIES.find((c) =>
        c.nameTr.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q)
      );

      if (matchedVisited) {
        baseScale = 480;
        centerCoords = [matchedVisited.lng, matchedVisited.lat];
      } else {
        const matchedGeo = geographies.find((g) => {
          const name = (g.properties?.name || "").toLowerCase();
          const trInfo = COUNTRY_INFO_MAP[g.properties?.name] || { tr: "" };
          return name.includes(q) || trInfo.tr.toLowerCase().includes(q);
        });

        if (matchedGeo) {
          try {
            const tempPath = geoPath().projection(geoMercator());
            const centroid = tempPath.centroid(matchedGeo);
            if (centroid) {
              const inverted = geoMercator().invert?.(centroid);
              if (inverted) {
                baseScale = 480;
                centerCoords = [inverted[0], inverted[1]];
              }
            }
          } catch {}
        }
      }
    } else {
      const config = REGION_CONFIGS[activeRegion] || REGION_CONFIGS.all;
      baseScale = config.scale;
      centerCoords = config.center;
    }

    return geoMercator()
      .scale(baseScale * scaleMultiplier)
      .center(centerCoords)
      .translate([MAP_WIDTH / 2 + panOffset.x, MAP_HEIGHT / 2 + panOffset.y]);
  }, [activeRegion, searchQuery, geographies, manualZoom, panOffset]);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // TopoJSON Dünya Harita Verisi Yükleme (Natural Earth 110m)
  useEffect(() => {
    let isMounted = true;
    fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        const countriesGeo = (feature(data, data.objects.countries) as any).features;
        setGeographies(countriesGeo);
        setIsLoadingMap(false);
      })
      .catch((err) => {
        console.error("Harita yüklenemedi:", err);
        if (isMounted) setIsLoadingMap(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredCountries = useMemo(() => {
    return VISITED_COUNTRIES.filter((country) => {
      const name = lang === "en" ? country.nameEn : country.nameTr;
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion =
        activeRegion === "all" ||
        country.region === activeRegion ||
        (activeRegion === "asya" && country.region === "ortadogu");
      return matchesSearch && matchesRegion;
    }).sort((a, b) => {
      const nameA = lang === "en" ? a.nameEn : a.nameTr;
      const nameB = lang === "en" ? b.nameEn : b.nameTr;
      return nameA.localeCompare(nameB, lang);
    });
  }, [searchQuery, activeRegion, lang]);

  const totalCountries = VISITED_COUNTRIES.length;

  return (
    <section id="isbirlikleri" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-24">
      {/* Arka plan ışık efektleri */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Başlık ve açıklama */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/30 text-[#c9a227] text-xs font-semibold uppercase tracking-wider mb-4">
            <Globe size={14} />
            <span>{lang === "en" ? "Global Academic & Professional Footprint" : "Uluslararası Temas ve İşbirlikleri"}</span>
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {lang === "en" ? "Partner & Collaborating Countries" : "İşbirliği Yapılan Ülkeler"}
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            {lang === "en"
              ? `Academic research, international delegation speeches, regional development projects, and official visits across ${totalCountries} countries.`
              : `Akademik çalışmalar, uluslararası heyet görüşmeleri, bölgesel kalkınma projeleri ve resmi temaslarda bulunulan toplam ${totalCountries} ülke.`}
          </p>
        </div>

        {/* Sayaçlar / İstatistik Şeritleri */}
        <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-[#c9a227]">{totalCountries}</p>
            <p className="text-xs md:text-sm text-slate-300 mt-1 font-medium">
              {lang === "en" ? "Countries Visited" : "Ziyaret Edilen Ülke"}
            </p>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 text-center backdrop-blur-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">5</p>
            <p className="text-xs md:text-sm text-slate-300 mt-1 font-medium">
              {lang === "en" ? "Continents" : "Kıta"}
            </p>
          </div>
        </div>

        {/* Harita Kartı */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-4 md:p-8 shadow-2xl backdrop-blur-md mb-12 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#c9a227]" size={20} />
              <span className="text-sm font-semibold text-slate-200">
                {lang === "en"
                  ? "Interactive World Map (You can click on the small yellow circles or one of the countries in the list)"
                  : "Etkileşimli Dünya Haritası (Küçük sarı yuvarlaklara ya da listedeki ülkelerden birine tıklayabilirsiniz)"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Mavi Renk - İşbirliği Yapılan Ülkeler */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <span className="w-3.5 h-3.5 rounded bg-[#2b4c7e] border border-[#3b82f6] shadow-sm inline-block shrink-0" />
                <span>{lang === "en" ? "Collaborating Countries" : "İşbirliği Yapılan Ülkeler"}</span>
              </div>

              {/* Sarı Nokta - Gidilen Şehirler */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-slate-950 shadow-sm inline-block shrink-0" />
                <span>{lang === "en" ? "Visited Cities" : "Gidilen Şehirler"}</span>
              </div>

              {selectedCountry && (
                <div className="flex items-center gap-2 bg-[#c9a227]/20 border border-[#c9a227]/40 text-[#c9a227] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                  <span>{selectedCountry.flag} {lang === "en" ? selectedCountry.nameEn : selectedCountry.nameTr}</span>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Gerçek 3D Kabartmalı SVG Dünya Haritası Container */}
          <div
            className={`relative w-full aspect-[2/1] bg-[#070d1e] rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group transition-transform duration-500 hover:rotate-x-0 ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            style={{
              transform: "perspective(1200px) rotateX(14deg) scale(0.98)",
              transformStyle: "preserve-3d",
            }}
            onMouseDown={(e) => {
              // Sadece sol tıklamada kaydırmayı başlat
              if (e.button === 0) {
                setIsDragging(true);
                setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
              }
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });

              if (isDragging) {
                setPanOffset({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y,
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => {
              setIsDragging(false);
              setMousePos(null);
              setHoverCountry(null);
              setHoverFeatureName(null);
            }}
            onWheel={(e) => {
              // Ctrl veya Cmd tuşuna basılı tutarak tekerlek döndürüldüğünde Zoom Yap
              if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
                setManualZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.7), 6));
              }
            }}
          >
            {/* Sol Alt Köşede Zoom ve Harita Kontrol Düğmeleri */}
            <div className="absolute bottom-4 left-4 z-40 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-xl backdrop-blur-md shadow-xl">
              <button
                onClick={() => setManualZoom((prev) => Math.min(prev * 1.25, 6))}
                title={lang === "en" ? "Zoom In" : "Büyüt"}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white font-bold text-sm transition-colors cursor-pointer"
              >
                +
              </button>
              <button
                onClick={() => setManualZoom((prev) => Math.max(prev / 1.25, 0.7))}
                title={lang === "en" ? "Zoom Out" : "Küçült"}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white font-bold text-sm transition-colors cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => {
                  setManualZoom(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                title={lang === "en" ? "Reset Map View" : "Görünümü Sıfırla"}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 text-slate-200 hover:bg-[#c9a227] hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                🔄
              </button>
              <span className="text-[10px] font-semibold text-slate-400 px-1 border-l border-slate-700">
                {Math.round(manualZoom * 100)}%
              </span>
            </div>



            {isLoadingMap && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 z-30">
                <div className="flex items-center gap-3 text-slate-300 text-sm">
                  <Loader2 className="animate-spin text-[#c9a227]" size={24} />
                  <span>{lang === "en" ? "Loading 3D World Map Data..." : "3D Dünya Haritası Yükleniyor..."}</span>
                </div>
              </div>
            )}

            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              className="w-full h-full object-cover"
            >
              {/* Okyanus, Izgara ve 3D Filtre Efektleri */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                {/* 3D Kabartma Derinlik Gölgesi */}
                <filter id="land-3d-shadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="3" dy="5" stdDeviation="3" floodColor="#000000" floodOpacity="0.7" />
                </filter>
                {/* Seçili/İğneli Ülke Işıma Efekti */}
                <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#060c1e" />
              <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#grid)" />

              {/* Okyanus İsimleri (Dil Seçeneğine Göre Dinamik Türkçe / İngilizce) */}
              <g className="oceans-layer pointer-events-none opacity-40 select-none" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="4">
                {(() => {
                  const OCEANS = [
                    { tr: "ATLANTİK OKYANUSU", en: "ATLANTIC OCEAN", lat: 10, lng: -28, rotate: -90 },
                    { tr: "HİNT OKYANUSU", en: "INDIAN OCEAN", lat: -15, lng: 75, rotate: -60 },
                    { tr: "BÜYÜK OKYANUS", en: "PACIFIC OCEAN", lat: 5, lng: -140, rotate: 0 },
                    { tr: "BÜYÜK OKYANUS", en: "PACIFIC OCEAN", lat: 10, lng: 165, rotate: 0 },
                    { tr: "ARKTİK OKYANUSU", en: "ARCTIC OCEAN", lat: 78, lng: 20, rotate: 0 },
                    { tr: "GÜNEY OKYANUSU", en: "SOUTHERN OCEAN", lat: -65, lng: 0, rotate: 0 },
                  ];

                  return OCEANS.map((ocean, i) => {
                    const coords = projection([ocean.lng, ocean.lat]);
                    if (!coords) return null;
                    const text = lang === "en" ? ocean.en : ocean.tr;
                    const [cx, cy] = coords;

                    return (
                      <text
                        key={i}
                        x={cx}
                        y={cy}
                        transform={ocean.rotate ? `rotate(${ocean.rotate}, ${cx}, ${cy})` : undefined}
                        textAnchor="middle"
                        className="font-mono uppercase transition-all duration-300"
                        style={{ fontStyle: "italic" }}
                      >
                        {text}
                      </text>
                    );
                  });
                })()}
              </g>

              {/* 3D Ekstra Derinlik ve Kalınlık Tabakaları (Katmanlı Gölge) */}
              <g className="countries-shadow-deep" opacity="0.4">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;
                  return (
                    <path
                      key={`shadow-deep-${geo.id || index}`}
                      d={d}
                      fill="#000000"
                      transform="translate(7, 11)"
                    />
                  );
                })}
              </g>

              <g className="countries-shadow-mid" opacity="0.7">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;
                  return (
                    <path
                      key={`shadow-mid-${geo.id || index}`}
                      d={d}
                      fill="#030816"
                      transform="translate(4, 6)"
                    />
                  );
                })}
              </g>

              {/* Azor Adaları (Azores) Coğrafi Ada Noktaları - Atlantik Okyanusu'nda küçük adacıklar */}
              {(() => {
                const azoresCoords = projection([-25.6756, 37.7412]);
                if (!azoresCoords) return null;
                const [ax, ay] = azoresCoords;
                return (
                  <g className="azores-islands-group" fill="#3b4f71" stroke="#c9a227" strokeWidth="0.8">
                    <circle cx={ax} cy={ay} r="2.2" />
                    <circle cx={ax - 5} cy={ay + 2} r="1.6" />
                    <circle cx={ax + 6} cy={ay - 3} r="1.8" />
                    <circle cx={ax - 10} cy={ay + 4} r="1.4" />
                    <circle cx={ax + 11} cy={ay - 5} r="1.5" />
                  </g>
                );
              })()}

              {/* Tataristan Özerk Cumhuriyeti (Kazan Havzası) Özel Mavi Bölge Vurgusu */}
              {(() => {
                const tatCoords = projection([49.0661, 55.8304]);
                if (!tatCoords) return null;
                const [tx, ty] = tatCoords;
                return (
                  <g className="tatarstan-region-group" fill="#2b4c7e" stroke="#c9a227" strokeWidth="0.8">
                    {/* Tataristan Volga Havzası Mavi Bölge Alanı */}
                    <polygon points={`${tx-8},${ty-5} ${tx+7},${ty-8} ${tx+12},${ty+4} ${tx+2},${ty+10} ${tx-9},${ty+6}`} />
                  </g>
                );
              })()}

              {/* Ana Coğrafi Ülke Poligonları (Kalınlaştırılmış 3D Kabartmalı Stilde ve Yükselme Efektli) */}
              <g className="countries" filter="url(#land-3d-shadow)">
                {geographies.map((geo, index) => {
                  const d = pathGenerator(geo);
                  if (!d) return null;

                  const geoName = geo.properties?.name || "";
                  const matchedActivePin = filteredCountries.find((c) => {
                    const nameEn = c.nameEn.toLowerCase();
                    const nameTr = c.nameTr.toLowerCase();
                    const gName = geoName.toLowerCase();
                    return (
                      gName === nameEn ||
                      gName === nameTr ||
                      (c.id === "RU" && (gName.includes("russia") || geo.id === "RUS")) ||
                      (c.id === "CZ" && (gName.includes("czech") || geo.id === "CZE")) ||
                      (c.id === "IR" && (gName.includes("iran") || geo.id === "IRN")) ||
                      (c.id === "US" && (gName.includes("united states") || gName.includes("america") || geo.id === "USA")) ||
                      (c.id === "GR" && (gName.includes("greece") || geo.id === "GRC")) ||
                      (c.id === "PS" && (gName.includes("palestin") || geo.id === "PSE" || gName.includes("west bank"))) ||
                      (c.id === "AE" && (gName.includes("emirates") || geo.id === "ARE")) ||
                      (c.id === "MK" && (gName.includes("macedonia") || geo.id === "MKD")) ||
                      (c.id === "BA" && (gName.includes("bosnia") || geo.id === "BIH")) ||
                      (c.id === "PT" && (gName.includes("portugal") || geo.id === "PRT")) ||
                      (c.id === "SM" && (gName.includes("marino") || geo.id === "SMR")) ||
                      (c.id === "XK" && (gName.includes("kosovo") || geo.id === "KOS" || geo.id === "XKX")) ||
                      (c.id === "KR" && (gName.includes("south korea") || gName === "korea, republic of" || geo.id === "KOR")) ||
                      (c.id && (c.id === geo.id || c.id === geo.properties?.iso_a2))
                    );
                  });

                  const isHovered = hoverCountry
                    ? (matchedActivePin?.id === hoverCountry.id)
                    : (hoverFeatureName && hoverFeatureName.toLowerCase() === geoName.toLowerCase());

                  const isSelected = selectedCountry && matchedActivePin?.id === selectedCountry.id;

                  // Seçilen veya hover edilen ülkeyi belirginleştirmesi
                  const isElevated = isHovered || isSelected;

                  return (
                    <g key={geo.id || index} className="country-polygon-group">
                      {/* Ülke Yüzeyi (Fiziki Konumu Kaymadan Titremesiz Şık Parlayan Yüzey) */}
                      <path
                        d={d}
                        fill={isElevated ? "#3b82f6" : matchedActivePin ? "#2b4c7e" : "#1a2a44"}
                        stroke={isElevated ? "#93c5fd" : matchedActivePin ? "#c9a227" : "#3b4f71"}
                        strokeWidth={(isElevated ? 2.2 : matchedActivePin ? 0.9 : 0.4) / Math.sqrt(manualZoom)}
                        onMouseEnter={() => {
                          if (matchedActivePin) {
                            setHoverCountry(matchedActivePin);
                            setHoverFeatureName(null);
                          } else {
                            setHoverCountry(null);
                            setHoverFeatureName(geoName);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoverCountry(null);
                          setHoverFeatureName(null);
                        }}
                        onClick={() => {
                          if (matchedActivePin) {
                            setSelectedCountry(matchedActivePin);
                          }
                        }}
                        className={`transition-colors duration-150 cursor-pointer ${
                          isElevated ? "drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]" : ""
                        }`}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Ziyaret Edilen Ülke İğneleri (Pins) - Sade, Temiz ve Şık Görünüm */}
              <g className="pins">
                {filteredCountries.map((country) => {
                  const coords = projection([country.lng, country.lat]);
                  if (!coords) return null;
                  const [x, y] = coords;

                  const isSelected = selectedCountry?.id === country.id;
                  const isHovered = hoverCountry?.id === country.id;
                  const isTurkey = country.id === "TR";
                  const isAzores = country.id === "AZORES";

                  const baseRadius = (isSelected ? 6 : isTurkey ? 5 : isAzores ? 2.5 : 3.5) / Math.sqrt(manualZoom);

                  return (
                    <g
                      key={country.id}
                      onClick={() => setSelectedCountry(country)}
                      onMouseEnter={() => setHoverCountry(country)}
                      onMouseLeave={() => setHoverCountry(null)}
                      className="cursor-pointer group/pin"
                    >
                      {/* Ana Tek İğne Noktası (Sabit, Titremesiz) */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered || isSelected ? baseRadius * 1.4 : baseRadius}
                        className={`transition-all duration-150 ease-out ${
                          isSelected
                            ? "fill-[#c9a227] stroke-white drop-shadow-lg"
                            : isTurkey
                            ? "fill-red-500 stroke-white drop-shadow-lg"
                            : "fill-amber-400 stroke-slate-950 group-hover/pin:fill-[#c9a227]"
                        }`}
                        strokeWidth={(isHovered || isSelected ? 1.4 : 1) / Math.sqrt(manualZoom)}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Şehirler Katmanı: Seçili veya Hover Edilen Ülkenin Ziyaret Edilen Şehirleri Kırmızı Noktalar İle Harita Üzerinde Belirir */}
              <g className="cities-layer pointer-events-none">
                {(() => {
                  const targetCountry =
                    hoverCountry ||
                    selectedCountry ||
                    (hoverFeatureName
                      ? VISITED_COUNTRIES.find(
                          (c) =>
                            c.nameEn.toLowerCase() === hoverFeatureName.toLowerCase() ||
                            c.nameTr.toLowerCase() === hoverFeatureName.toLowerCase() ||
                            (c.id === "US" && hoverFeatureName.toLowerCase().includes("united states"))
                        )
                      : null);

                  if (!targetCountry || !targetCountry.cities) return null;

                  return targetCountry.cities.map((city, cIdx) => {
                    const cityCoords = projection([city.lng, city.lat]);
                    if (!cityCoords) return null;
                    const [cx, cy] = cityCoords;

                    return (
                      <g key={cIdx}>
                        {/* Ana Şehir Kırmızı Noktası (Yükseltilmiş 3D Ülke Yüzeyi Üzerine Yerleşir) */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={1.8 / Math.sqrt(manualZoom)}
                          fill="#ef4444"
                          stroke="#ffffff"
                          strokeWidth={0.5 / Math.sqrt(manualZoom)}
                        />
                      </g>
                    );
                  });
                })()}
              </g>
            </svg>

            {/* Haritanın Sağ Tarafında O Ülkenin Ziyaret Edilen Şehirleri Listesi Paneli (Soldan Sağa Akıcı Kayma Animasyonlu) */}
            <AnimatePresence>
              {(() => {
                const activeCountry =
                  hoverCountry ||
                  selectedCountry ||
                  (hoverFeatureName
                    ? VISITED_COUNTRIES.find(
                        (c) =>
                          c.nameEn.toLowerCase() === hoverFeatureName.toLowerCase() ||
                          c.nameTr.toLowerCase() === hoverFeatureName.toLowerCase() ||
                          (c.id === "US" && hoverFeatureName.toLowerCase().includes("united states"))
                      )
                    : null);

                if (!activeCountry || !activeCountry.cities || activeCountry.cities.length === 0) return null;

                const isMultiCol = activeCountry.cities.length > 10;

                return (
                  <motion.div
                    key={`cities-${activeCountry.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-20 right-4 z-30 bg-slate-900/95 border border-red-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md text-left ${
                      isMultiCol ? "w-72 md:w-80" : "w-44 md:w-48"
                    }`}
                  >
                    <div
                      className={`gap-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar ${
                        isMultiCol ? "grid grid-cols-2" : "flex flex-col"
                      }`}
                    >
                      {activeCountry.cities.map((city, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700/80 shadow-sm w-full truncate"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          <span className="truncate">{lang === "en" ? city.nameEn : city.nameTr}</span>
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Haritanın Sağ Üst Köşesinde Sabit Rozet - Soldan Sağa Süzülerek Gelen Şık Akıcı Animasyonlu */}
            <AnimatePresence>
              {(hoverCountry || hoverFeatureName) && (() => {
                let name = "";
                let flag = "🌐";
                let isTurkeyBadge = false;
                let countryKey = "badge";

                if (hoverCountry) {
                  name = hoverCountry.id === "TR" ? "TÜRKİYE" : (lang === "en" ? hoverCountry.nameEn : hoverCountry.nameTr);
                  flag = hoverCountry.flag;
                  isTurkeyBadge = hoverCountry.id === "TR";
                  countryKey = hoverCountry.id;
                } else if (hoverFeatureName) {
                  const countryInfo = COUNTRY_INFO_MAP[hoverFeatureName] || {
                    tr: hoverFeatureName,
                    flag: "🌐",
                  };
                  isTurkeyBadge = hoverFeatureName.toLowerCase().includes("turkey") || hoverFeatureName.toLowerCase().includes("türkiye");
                  name = isTurkeyBadge ? "TÜRKİYE" : (lang === "en" ? hoverFeatureName : countryInfo.tr);
                  flag = countryInfo.flag;
                  countryKey = hoverFeatureName;
                }

                return (
                  <motion.div
                    key={`badge-${countryKey}`}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-4 right-4 z-40 px-4.5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 pointer-events-none ${
                      isTurkeyBadge
                        ? "bg-red-950/90 border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.95)]"
                        : "bg-slate-900/95 border-2 border-slate-700 text-white"
                    }`}
                  >
                    <span className="text-2xl">{flag}</span>
                    <span
                      className={`font-black text-sm md:text-base tracking-wide ${
                        isTurkeyBadge
                          ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
                          : "text-white"
                      }`}
                    >
                      {name} {isTurkeyBadge && "🇹🇷"}
                    </span>
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Seçili Ülke Detay Kartı Overlay */}
            <AnimatePresence>
              {selectedCountry && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 border border-[#c9a227]/50 rounded-2xl p-4 shadow-2xl backdrop-blur-lg text-left z-20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{selectedCountry.flag}</span>
                      <div>
                        <h4 className="text-lg font-bold text-white leading-tight">
                          {lang === "en" ? selectedCountry.nameEn : selectedCountry.nameTr}
                        </h4>
                        <span className="text-xs text-[#c9a227] font-medium uppercase tracking-wider">
                          {selectedCountry.id === "TR"
                            ? lang === "en" ? "Home Base" : "Ana Vatan / Merkez"
                            : lang === "en" ? "Visited & Delegation Partner" : "Ziyaret & Temas Ülkesi"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCountry(null)}
                      className="text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Arama ve Filtreleme Şeridi */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 md:p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "en" ? "Search country..." : "Ülke ara..."}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#c9a227] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: "all", labelTr: "Tüm Ülkeler", labelEn: "All Countries" },
                { id: "avrupa", labelTr: "Avrupa", labelEn: "Europe" },
                { id: "asya", labelTr: "Asya", labelEn: "Asia" },
                { id: "ortadogu", labelTr: "Orta Doğu", labelEn: "Middle East" },
                { id: "afrika", labelTr: "Afrika", labelEn: "Africa" },
                { id: "amerika", labelTr: "Amerika", labelEn: "Americas" },
              ].map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setActiveRegion(reg.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeRegion === reg.id
                      ? "bg-[#c9a227] text-slate-950 shadow-md shadow-[#c9a227]/20"
                      : "bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {lang === "en" ? reg.labelEn : reg.labelTr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {filteredCountries.map((country) => {
              const isSelected = selectedCountry?.id === country.id;
              const hasCities = country.cities && country.cities.length > 0;

              return (
                <div
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  onMouseEnter={() => setHoverCountry(country)}
                  onMouseLeave={() => setHoverCountry(null)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#c9a227]/20 border-[#c9a227] text-white shadow-lg"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl shrink-0">{country.flag}</span>
                    <span className="text-sm font-bold text-white leading-snug">
                      {lang === "en" ? country.nameEn : country.nameTr}
                    </span>
                  </div>

                  {/* Ülke isminin altında şehirlerin listelenmesi (10 şehre kadar tek sütun alt alta, 10 üzeri 2 sütun) */}
                  {hasCities && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/50">
                      <div
                        className={`gap-1.5 ${
                          country.cities && country.cities.length > 10
                            ? "grid grid-cols-2"
                            : "flex flex-col"
                        }`}
                      >
                        {country.cities?.map((city, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60 truncate"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 inline-block" />
                            <span className="truncate">{lang === "en" ? city.nameEn : city.nameTr}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
