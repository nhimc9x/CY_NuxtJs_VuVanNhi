import {faker} from '@faker-js/faker';

export default defineEventHandler(async (event) => {
  return Array.from({length: 10}, () => {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlPlaceholder()
    }
  })
});