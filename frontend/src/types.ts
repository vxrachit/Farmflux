// export interface Weather {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//   };
//   current: {
//     temp_c: number;
//     condition: {
//       text: string;
//       icon: string;
//     };
//     humidity: number;
//     wind_kph: number;
//   };
// }
export interface Weather {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
}

export interface CropData {
  name: string;
  area: number;
  yield: number;
  plantingDate: string;
  expectedHarvestDate: string;
}

export interface SoilAnalysis {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
}

export interface MandiPriceData {
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrival_date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
}

export interface MandiPriceResponse {
  status: string;
  timestamp: string;
  data: MandiPriceData[];
}
