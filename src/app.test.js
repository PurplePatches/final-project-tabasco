import React from "react";
import { shallow } from "enzyme";

import App from "./app";

test("app testing test", () => {
    const wrapper = shallow(<App />);
    expect(true).toBe(true);
});
