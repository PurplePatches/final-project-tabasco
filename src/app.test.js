import React from "react";
import { shallow } from "enzyme";
import App from "./app";
import axios from "./axios";

jest.mock("./axios");

test("app put user info in state", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: "Vic",
            last: "M",
            image: "/default.png",
            bio: "Hey you!"
        }
    });
    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });
    await wrapper.instance().componentDidMount();
    expect(wrapper.state("id")).toBe(1);
});
