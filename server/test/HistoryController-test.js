const chaiHttp = require("chai-http");
const chaiSorted = require("chai-sorted");
const chai = require("chai");
const app = require("../src/index");

chai.use(chaiHttp);
chai.use(chaiSorted);
chai.should();

describe("History Controller Test", () => {
    before('Request Itajuba', (done) => {
        chai.request(app)
            .get("/currentWeather?city=Itajuba")
            .end((_) => {
                console.log("Request 1/5");
                done();
            });
    });
    before('Request Santos', (done) => {
        chai.request(app)
            .get("/currentWeather?city=Santos")
            .end((_) => {
                console.log("Request 2/5");
                done();
            });
    });
    before('Request Goiania', (done) => {
        chai.request(app)
            .get("/currentWeather?city=Goiania")
            .end((_) => {
                console.log("Request 3/5");
                done();
            });
    });
    before('Request Passos', (done) => {
        chai.request(app)
            .get("/currentWeather?city=Passos")
            .end((_) => {
                console.log("Request 4/5");
                done();
            });
    });
    before('Request Vitoria', (done) => {
        chai.request(app)
            .get("/currentWeather?city=Vitoria")
            .end((_) => {
                console.log("Request 5/5");
                done();
            });
    });
    it("should return history", (done) => {
        chai.request(app)
            .get("/history?limit=5")
            .end((_, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array").to.have.length(5);
                done();
            });
    });
    it("should return history", (done) => {
        chai.request(app)
            .get("/history?isTop=true&limit=5")
            .end((_, res) => {
                res.should.have.status(200);
                res.body.should.be
                    .a("array")
                    .to.have.length(5)
                    .to.be.sorted({ descending: true });
                done();
            });
    });
});
