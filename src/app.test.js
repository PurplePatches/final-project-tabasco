import React from "react";
import { shallow } from "enzyme";
import App from "./app";
import axios from "./axios";

jest.mock("./axios");

test("app sets state", async () => {
    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first_name: "Banana",
            last_name: "Rama",
            image_url: "/funky.png",
            bio: "You look marvelous"
        }
    });

    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    expect(wrapper.state("id")).toBe(1);

    expect(wrapper.state("first_name")).toBe("Banana");

    expect(wrapper.state("last_name")).toBe("Rama");

    expect(wrapper.find("ProfilePic").length).toBe(1);
});
