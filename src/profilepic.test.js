import React from 'react';
import { shallow } from 'enzyme';

import ProfilePic from './profilepic';


test('Passed url makes into src', () => {
    const wrapper = shallow(<ProfilePic url="/themoreyouknow.jpg" />)

    expect(
        wrapper.find('img').length
    ).toBe(1);

    expect(
        wrapper.find('img').prop('src')
    ).toBe("/themoreyouknow.jpg");
});

test('When no url is passed "/default.jpg" is in src', () => {
    const wrapper = shallow(<ProfilePic />)

    expect(
        wrapper.find('img').prop('src')
    ).toBe("/default.jpg");
});

test('First and last in alt', () => {
    const wrapper = shallow(<ProfilePic first="Funky" last="Chicken" />)

    expect(
        wrapper.find('img').prop('alt')
    ).toBe("Funky Chicken");
});

test('Pass onClick gets called on click', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<ProfilePic onClick={onClick} />)

    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');


    expect(
        onClick.mock.calls.length
    ).toBe(5);
});
