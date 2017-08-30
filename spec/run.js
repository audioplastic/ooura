// From here https://gist.github.com/mauvm/172878a9646095d03fd7
// While Circle CI 2.0 still has crusty old node images

import Jasmine from 'jasmine'

var jasmine = new Jasmine()
jasmine.loadConfigFile('spec/support/jasmine.json')
jasmine.execute()
