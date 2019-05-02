import React from "react";
import { shallow } from "enzyme";
import Bio from "./bio";
import axios from "./axios";

jest.mock("./axios");

test("If there's no bio, the form will be shown", async () => {
    const wrapper = shallow(<Bio bio={{ bio: null }} />, {
        disableLifecycleMethods: true,
        bio: null
    });

    expect(wrapper.state("bio")).toBe(null);

    expect(wrapper.state("showForm")).toBe(true);
});
