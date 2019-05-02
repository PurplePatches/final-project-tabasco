import React from "react";
import { shallow } from "enzyme";
import Bio from "./bio";
import axios from "./axios";

jest.mock("./axios");

test("If there's no bio, the form will be shown", async () => {
    axios.get.mockResolvedValue({
        data: {
            bio: null
        }
    });

    const wrapper = shallow(<Bio />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    expect(wrapper.state("bio")).toBe(null);

    expect(wrapper.state("showForm")).toBe(true);
});
