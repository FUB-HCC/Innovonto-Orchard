import styled from "@emotion/styled";
import { sparkSize } from "../constants";
const Box = styled.div(
  {
    margin: "20px 10px",
    overflow: "auto",
    minHeight: sparkSize.height,
    maxHeight: "calc(30vh)"
  },
  ({ color, backgroundColor }) => ({
    color,
    backgroundColor
  })
);

export { Box };
