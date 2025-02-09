const brands = ["Yamaha", "Honda", "Suzuki", "KTM", "Bajaj"];

export const brandsOptions = brands.map((item) => ({
  value: item,
  label: item,
}));
const motorbikeCategories = [
  "Sport Bikes",
  "Cruiser Bikes",
  "Touring Bikes",
  "Adventure Bikes",

  "Electric Bikes",
];
export const bikeCategoriesOptions = motorbikeCategories.map((item) => ({
  value: item,
  label: item,
}));
