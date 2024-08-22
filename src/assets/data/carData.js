// import all images from assets/images directory
import img01 from "../all-images/cars-img/nissan-offer.png";
import img02 from "../all-images/cars-img/offer-toyota.png";
import img03 from "../all-images/cars-img/bmw-offer.png";
import img04 from "../all-images/cars-img/nissan-offer.png";
import img05 from "../all-images/cars-img/offer-toyota.png";
import img06 from "../all-images/cars-img/mercedes-offer.png";
import img07 from "../all-images/cars-img/toyota-offer-2.png";
import img08 from "../all-images/cars-img/mercedes-offer.png";

const carData = [
  {
    id: 1,
    brand: "Tesla",
    rating: 112,
    carName: "Tesla Malibu",
    acNonac:"AC",
    imgUrl: img01,
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    oil:"petrol",
    category:"SUV",
    no_seat:5,
    transmission_type: "Automatic",
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 2,
    brand: "Toyota",
    rating: 102,
    acNonac:"Non-AC",
    carName: "Toyota Aventador",
    imgUrl: img02,
    model: "Model-2022",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    no_seat:5,
    category:"SUV",
    transmission_type: "Automatic",
    oil:"petrol",
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 3,
    brand: "BMW",
    rating: 132,
    acNonac:"Non-AC",
    carName: "BMW X3",
    imgUrl: img03,
    model: "Model-2022",
    price: 65,
    speed: "20kmpl",
    category:"Sedan",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"petrol",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 4,
    brand: "Nissan",
    rating: 102,
    acNonac:"Non-AC",
    carName: "Nissan Mercielago",
    imgUrl: img04,
    model: "Model-2022",
    price: 70,
    speed: "20kmpl",
    category:"SUV",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"petrol",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 5,
    brand: "Ferrari",
    rating: 94,
    carName: "Ferrari Camry",
    imgUrl: img05,
    acNonac:"Non-AC",
    model: "Model-2022",
    price: 45,
    speed: "20kmpl",
    category:"SUV",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"petrol",
    no_seat:7,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 6,
    brand: "Mercedes",
    rating: 119,
    acNonac:"AC",
    carName: "Mercedes Benz XC90",
    imgUrl: img06,
    model: "Model-2022",
    price: 85,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"diesel",
    category:"Sedan",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 7,
    brand: "Audi",
    rating: 82,
    acNonac:"AC",
    carName: "Audi Fiesta",
    imgUrl: img07,
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"diesel",
    category:"Sedan",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },

  {
    id: 8,
    brand: "Colorado",
    rating: 52,
    acNonac:"AC",
    carName: "Rolls Royce Colorado",
    imgUrl: img08,
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    transmission_type: "Automatic",
    oil:"diesel",
    category:"Sedan",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },
  {
    id: 9,
    brand: "BMW",
    rating: 52,
    acNonac:"Non-AC",
    carName: "BMW",
    imgUrl: img02,
    model: "Model 3",
    price: 50,
    speed: "20kmpl",
    gps: "GPS Navigation",
    seatType: "Heated seats",
    category:"SUV",
    transmission_type: "Manual",
    oil:"diesel",
    no_seat:5,
    description:
      " Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam. Dolor labore lorem no accusam sit justo sadipscing labore invidunt voluptua, amet duo et gubergren vero gubergren dolor. At diam.",
  },
];

export default carData;
