const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiEnzyme = require('chai-enzyme')

chai.use(sinonChai)
chai.use(chaiEnzyme())

const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })