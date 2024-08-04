// In package.json ----->>>   ( "test":"mocha --timeout 10000" )  
// then inside test folder file should be ----->>>  ( app.test.js )

let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

// every test cases starts with 'describe' keyword.

describe('Testing Api',()=>{
    it('Should return 200 for health',(done)=>{
        chai.request('http://localhost:6722/').get('/health').then((res)=>{
            expect(res).to.have.status(200);
            expect(res.text).to.equal('Health Ok');
            done();
        })
        .catch((err)=>{
            throw err
        })
    })
})