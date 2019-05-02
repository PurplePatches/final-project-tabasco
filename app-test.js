import React from "react";
import { shallow } from "enzyme";
import axios from "./axios";

import App from "./app";

jest.mock("./axios");

test("app set state", async () => {
    axios.get.mochResolvedValue({
        data: {
            id: 1,
            first: "funcky",
            last: "chicken",
            image: "/funcky.png",
            bio: "I like chicken"
        }
    });

    const wrapper = shallow(<App />, {
        disableLifecycleMethod: true
    });

    await wrapper.instance().componentDidMount();

    expect(wrapper.state("id")).toBe(undefined);
    expect(wrapper.state("first")).toBe("Funcky");
    expect(wrapper.state("last")).toBe("Chicken");

    expect(wrapper.find("ProfilePic").lengh).toBe(1);
});
