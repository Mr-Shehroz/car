export default {
  name: 'car',
  title: 'Car',
  type: 'document',
  fields: [
    { name: 'name', title: 'Car Name', type: 'string' },
    { name: 'brand', title: 'Brand', type: 'string' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'pricePerDay', title: 'Price Per Day', type: 'number' },
    { name: 'available', title: 'Available', type: 'boolean' },
  ],
}
