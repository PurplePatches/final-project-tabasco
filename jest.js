import Enzyme from "enzyme";
import "@babel/polyfill";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
