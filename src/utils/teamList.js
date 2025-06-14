export const getTeamListByYear = (year) => {
  switch (year) {
    case "2024":
      return [
        {
          name: "mclaren",
          color: "#FF8000",
        },
        {
          name: "ferrari",
          color: "#E8002D",
        },
        {
          name: "mercedes",
          color: "#27F4D2",
        },
        {
          name: "red_bull",
          color: "#3671C6",
        },
        {
          name: "alpine",
          color: "#FF87BC",
        },
        {
          name: "rb",
          color: "#6692FF",
        },
        {
          name: "sauber",
          color: "#52E252",
        },
        {
          name: "haas",
          color: "#B6BABD",
        },
        {
          name: "williams",
          color: "#64C4FF",
        },
        {
          name: "aston_martin",
          color: "#229971",
        },
      ];
    case "2025":
      return [
        {
          name: "mclaren",
          color: "#F47600",
        },
        {
          name: "ferrari",
          color: "#ED1131",
        },
        {
          name: "mercedes",
          color: "#00D7B6",
        },
        {
          name: "red_bull",
          color: "#4781D7",
        },
        {
          name: "alpine",
          color: "#FF87BC",
        },
        {
          name: "rb",
          color: "#6C98FF",
        },
        {
          name: "sauber",
          color: "#01C00E",
        },
        {
          name: "haas",
          color: "#9C9FA2",
        },
        {
          name: "williams",
          color: "#1868DB",
        },
        {
          name: "aston_martin",
          color: "#229971",
        },
      ];
    case "2026":
      return [
        {
          name: "audi",
          color: "#A0A0A0", // Example color for Audi
        },
        {
          name: "mclaren",
          color: "#FF8000",
        },
      ];
    default:
      return [];
  }
}; 