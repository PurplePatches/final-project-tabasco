import React from "react";
import { shallow } from "enzyme";
import ProfilePic from "./profilepic";
import axios from "./axios";

test("passed url makes into src", () => {
    const wrapper = shallow(
        <ProfilePic profilePic={"hey.jpg"} first={"vicky"} last={"test"} />
    );
    expect(wrapper.find("img").length).toBe(1);
    expect(wrapper.find("img").prop("src")).toBe("hey.jpg");
    expect(wrapper.find("img").prop("src")).toBe("hey.jpg");
    expect(wrapper.find("img").prop("alt")).toBe("vicky test");
});
