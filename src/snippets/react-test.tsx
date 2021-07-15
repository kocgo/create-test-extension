import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  cleanup,
} from "@testing-library/react";
import { ComponentName} from "./ComponentName;

afterEach(cleanup);

describe("<ComponentName />", () => {
  const { getByTestId, getByText } = render(<ComponentName/>);

  test("should render ComponentName", async () => {
    // ???
  });
});
