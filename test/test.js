const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const { expect } = chai;
const fetch = require("node-fetch");

let url = "http://localhost:5000";



chai.use(chaiHttp);



//create
describe("Create the Boat in the Database", () => {
  after(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  })

  before(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  })
  it("Create Boat With 0 Speed and 0 Direction", (done) => {
    chai
      .request(url)
      .post("/data/create")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body.boat.speed).to.equals(0);
        expect(res.body.boat.direction).to.equals(0);
        done();
      });
  });
});

describe("Fail To Create Multiple Boats", () => {
  before(async function(){
    await fetch(url + "/data/create",{method:"POST"})
  });
  after(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  
  })
  it("Only One Boat Allowed in Database", (done) => {
    chai
      .request(url)
      .post("/data/create")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equals(false);
        done();
      });
  });
});

// update
describe("Update Boat Properly", () => {
  before(async function(){
    await fetch(url + "/data/create",{method:"POST"})
  }
  );
  after(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  })
  it("Update Boat to speed = 10 and direction = 10", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: 10, direction: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body.boat.speed).to.equals(10);
        expect(res.body.boat.direction).to.equals(10);
        done();
      });
  });
  it("Fail to Update Boat, speed > 100", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: 100, direction: 10 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Speed is too high");
        done();
      });
  });

  it("Fail to Update Boat, speed < 0", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: -10, direction: 10 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Speed is too low");
        done();
      });
  });

  it("Fail to Update Boat, Direction too High", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: 10, direction: 100 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Direction is out of range");
        done();
      });
  });

  it("Fail to Update Boat, Direction too Low", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: 10, direction: -100 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Direction is out of range");
        done();
      });
  });
});

describe("Fail to Update Missing Boat", () => {
  before(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  });
  it("Database Empty, Fail to Update", (done) => {
    chai
      .request(url)
      .post("/data/send")
      .send({ speed: 10, direction: 10 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Boat not found");
        done();
      });
  });
});

describe("Delete Boat in Database", () => {
    before(async function(){
        await fetch(url + "/data/create",{method:"POST"})
    })
    after(async function(){
        await fetch(url + "/data/delete",{method:"DELETE"})
    })
  it("Deleted Boat", (done) => {
    chai
      .request(url)
      .delete("/data/delete")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        done();
      });
  });
});


describe("Fail to Delete Boat from Empty Database", () => {
  before(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  });
  it("No Boat to Delete", (done) => {
    chai
      .request(url)
      .delete("/data/delete")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equals(false);
        expect(res.body.msg).to.equals("Boat was not found");
        done();
      });
  });
});

describe("Get Boat Data", () => {
  before(async function(){
    await fetch(url + "/data/create",{method:"POST"})
  });
  after(async function(){
    await fetch(url + "/data/delete",{method:"DELETE"})
  });
  it("Retrieved All Boat Data for Client", (done) => {
    chai
      .request(url)
      .get("/data/get")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals(true);
        expect(res.body.boat.speed).to.equals(0);
        expect(res.body.boat.direction).to.equals(0);
        done();
      });
  });
})
