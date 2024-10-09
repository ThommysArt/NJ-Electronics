import { faker } from '@faker-js/faker';
import { Order, Category, Product, User, UserRole } from '@prisma/client';

const billingMethods = ['Orange Money', 'MTN MOMO', 'Bank Transfer'];

export const generateOrdersData = (count: number): Order[] => {
  const data: Order[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: faker.string.uuid(),
      amount: faker.number.int({min:5000, max:100000}),
      deliveryLocation: faker.location.streetAddress(),
      paymentMethod: faker.helpers.arrayElement(billingMethods),
      paymentName: faker.person.fullName(),
      paymentPhone: faker.phone.number(),
      createdAt: faker.date.between({ from: '2023-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }),
      updatedAt: faker.date.recent(),
      isPaid: faker.datatype.boolean(),
      isDelivered: faker.datatype.boolean(),
      cartId: faker.string.uuid(),
      userId: faker.string.uuid(),
    });
  }
  return data;
};

export const generateCategoriesData = (count: number): Category[] => {
  const data: Category[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      categoryId: faker.string.uuid(),
      name: faker.commerce.department(),
    });
  }
  return data;
};

export const generateProductsData = (count: number): Product[] => {
  const data: Product[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      productId: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      reduction: faker.number.int({min: 0, max: 25}),
      images: [ faker.image.url(), faker.image.url(), faker.image.url() ],
      units: faker.number.int({min: 0, max: 100}),
      categoryId: faker.string.uuid(),
      isAvailable: true
    });
  }
  return data;
};

export const generateCustomersData = (count: number): User[] => {
  const data: User[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.date.past(),
      image: faker.image.avatar(),
      role: UserRole.CUSTOMER,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });
  }
  return data;
};
