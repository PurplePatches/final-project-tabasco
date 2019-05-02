import React from "react"
import {shallow} from "enzyme"

import ProfilePic from "./profilepic"

test("Passed url makes into src", () => {
    const wrapper = shallow(<ProfilePic url="/themoreyouknow.jpg")

    expect(
        wrapper.find("img").lengh
    ).toBe(1)

    expect(
        wrapper.find("img").props("src")
    )toBe("")
})
