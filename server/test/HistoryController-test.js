const chaiHttp = require("chai-http");
const chaiSorted = require("chai-sorted");
const chai = require("chai");
const app = require("../src/index");

chai.use(chaiHttp);
chai.use(chaiSorted);
chai.should();

describe("History Controller Test", () => {
    before((done) => {
        chai.request(app)
            .get("/currentWeather?city=Itajuba")
            .end((_) => {
                done();
            });
    });
    before((done) => {
        chai.request(app)
            .get("/currentWeather?city=Santos")
            .end((_) => {
                done();
            });
    });
    before((done) => {
        chai.request(app)
            .get("/currentWeather?city=Goiania")
            .end((_) => {
                done();
            });
    });
    before((done) => {
        chai.request(app)
            .get("/currentWeather?city=Passos")
            .end((_) => {
                done();
            });
    });
    before((done) => {
        chai.request(app)
            .get("/currentWeather?city=Vitoria")
            .end((_) => {
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
