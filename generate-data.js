const faker = require('faker');
const { fa } = require('faker/lib/locales');
const fs = require('fs');

faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, n) => {
  if (n <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(n)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }

  return productList;
};

const randomUserList = (n) => {
  if (n <= 0) return [];
  const userList = [];

  Array.from(new Array(n)).forEach(() => {
    const user = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      gender: faker.name.gender(),
      job: faker.name.jobTitle(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    userList.push(user);
  });

  return userList;
};

(() => {
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 5);
  const userList = randomUserList(10);

  // prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    users: userList,
  };

  //
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully !!!');
  });
})();
