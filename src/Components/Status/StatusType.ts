export type ColorType = "primary" | "danger" | "normal";

export type StatusType = {
  title: string;
  color: ColorType;
};

export const returnStatusColor = (color: ColorType) => {
  switch (color) {
    case "primary":
      return {
        color1: "#03AC00",
        color2: "#DEF7E0",
      };

    case "danger":
      return {
        color1: "#FD5959",
        color2: "#F8EBE8",
      };

    case "normal":
      return {
        color1: "#919DBA",
        color2: "#EAF1F8",
      };

    default:
      return {
        color1: "#03AC00",
        color2: "#DEF7E0",
      };
  }
};
