const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../src/index");

chai.use(chaiHttp);
chai.should();

describe("Current Weather Controller Test", () => {
    it("should return city", (done) => {
        chai.request(app)
            .get("/currentWeather?city=Itajuba")
            .end((_, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should return not found", (done) => {
        chai.request(app)
            .get("/currentWeather?city=A")
            .end((_, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });

    it("should return not found", (done) => {
        chai.request(app)
            .get("/currentWeather")
            .end((_, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                done();
            });
    });
});
