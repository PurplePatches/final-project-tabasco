import React from 'react';
import { shallow } from 'enzyme';
import App from './app';
import axios from './axios';

jest.mock('./axios');

test('app sets state', async () => {

    axios.get.mockResolvedValue({
        data: {
            id: 1,
            first: 'Funky',
            last: 'Chicken',
            image: '/funky.png',
            bio: 'You look marvelous'
        }
    });

    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().componentDidMount();

    expect(
        wrapper.state('id')
    ).toBe(1);

    expect(
        wrapper.state('first')
    ).toBe('Funky');

    expect(
        wrapper.state('last')
    ).toBe('Chicken');

    expect(
        wrapper.find('ProfilePic').length
    ).toBe(1)
});
