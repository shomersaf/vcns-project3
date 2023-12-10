const { expect } = require("chai")
const axios = require("axios")
var insertId = 0;
const fromDate =  "1998-01-02";
const toDate = "1999-01-02";


describe("POST /vacations/new", function(){
  it("POST vacation - Success ", async function () {
    const dummyVacation = {
      destination: "somewhere",
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    const { data } = result;
    insertId = data.insertId;
      expect(result.status).equal(200)
});

it("POST vacation - Wrong price data type ", async function () {
  try {
    const dummyVacation = {
      destination: "somewhere",
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: "hjhjhkhkj",
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("POST vacation - Some data is absent ", async function () {
  try {
    const dummyVacation = {
      destination: "",
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("POST vacation - Wrong data type entered", async function () {
  try {
    const dummyVacation = {
      destination: 123,
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("POST vacation - Wrong image source - irrelevant ending", async function () {
  try {
    const dummyVacation = {
      destination: "somewhere",
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("POST vacation - Wrong image source - irrelevant beginning", async function () {
  try {
    const dummyVacation = {
      destination: "somewhere",
      about: "some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg"
}
    const result = await axios.post("http://localhost:4001/vacations/new", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("PUT vacation - Success ", async function () {
  const dummyVacation = { 
    destination: "new somewhere",
    about: "new some words",
    fromDate: fromDate,
    toDate: toDate,
    price: 5678,
    imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg",
    vcnId: insertId
}
  const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
  const { data } = result;
    expect(result.status).equal(200)
});

it("PUT vacation - Wrong price data type ", async function () {
  try {
    const dummyVacation = {
      destination: "new somewhere",
      about: "new some words",
      fromDate: fromDate,
      toDate: toDate,
      price: "hjhjhkhkj",
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg",
      vcnId: insertId
}
    const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("PUT vacation - Some data is absent ", async function () {
  try {
    const dummyVacation = {
      destination: "",
      about: "new some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg",
      vcnId: insertId
}
    const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("PUT vacation - Wrong data type entered", async function () {
  try {
    const dummyVacation = {
      destination: 123,
      about: "new some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg",
      vcnId: insertId
}
    const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("PUT vacation - Wrong image source - irrelevant ending", async function () {
  try {
    const dummyVacation = {
      destination: "new somewhere",
      about: "new some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "https://sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14",
      vcnId: insertId
}
    const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

it("PUT vacation - Wrong image source - irrelevant beginning", async function () {
  try {
    const dummyVacation = {
      destination: "new somewhere",
      about: "new some words",
      fromDate: fromDate,
      toDate: toDate,
      price: 1235,
      imageSrc: "sportishka.com/uploads/posts/2022-03/thumbs/1646384528_13-sportishka-com-p-antaliya-kemer-turizm-krasivo-foto-14.jpg",
      vcnId: insertId
}
    const result = await axios.put("http://localhost:4001/vacations/edit", dummyVacation)
    throw new Error("TEST FAILED")
} catch (error) {
    expect(error?.response.status).equal(400)
}
});

describe("GET /VACATIONS", function () {
  it("Get Vacations - followers per vacations - ALL ", async function () {
      const result = await axios.get(`http://localhost:4001/vacations?_stepFrom=0&_filterName=all&_filterBy=`)
    const { data } = result;
    //console.log(data)
      expect(result.status).equal(200)
      expect(typeof result.data).equal("object")
       const isFillowingArray = Array.isArray(result.data);
       expect(isFillowingArray).equal(true)
  })
});


describe("GET /VACATIONS", function () {
  it("Get Vacations - followers per vacations - FAVOURITES ", async function () {
      const result = await axios.get(`http://localhost:4001/vacations?_stepFrom=0&_filterName=favourites&_filterBy=one@co.il`)
    const { data } = result;
    //console.log(data)
      expect(result.status).equal(200)
      expect(typeof result.data).equal("object")
       const isFillowingArray = Array.isArray(result.data);
       expect(isFillowingArray).equal(true)
  })
});

describe("GET /VACATIONS", function () {
  it("Get Vacations - followers per vacations - CURRENT ", async function () {
      const result = await axios.get(`http://localhost:4001/vacations?_stepFrom=0&_filterName=current&_filterBy=`)
    const { data } = result;
    //console.log(data)
      expect(result.status).equal(200)
      expect(typeof result.data).equal("object")
       const isFillowingArray = Array.isArray(result.data);
       expect(isFillowingArray).equal(true)
  })
});


describe("GET /VACATIONS", function () {
  it("Get Vacations - followers per vacations - UPCOMING ", async function () {
      const result = await axios.get(`http://localhost:4001/vacations?_stepFrom=0&_filterName=upcoming&_filterBy=`)
    const { data } = result;
    //console.log(data)
      expect(result.status).equal(200)
      expect(typeof result.data).equal("object")
       const isFillowingArray = Array.isArray(result.data);
       expect(isFillowingArray).equal(true)
  })
});


describe("DELETE /vacations/delete/:vcnId", function(){
  it("Delete vacation - Success ", async function () {
    // console.log("insertId: ",insertId)
    vcnId = insertId.toString();
    const result = await axios.delete(`http://localhost:4001/vacations/delete/${vcnId}`)
    expect(result.status).equal(200)
})
});



})
