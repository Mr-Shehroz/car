import type { Rule } from '@sanity/types';

export default {
  name: 'reservation',
  title: 'Reservation',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(2)
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'car',
      title: 'Car Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'carPriceperDay',
      title: 'Price per Day ($)',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(1)
    },
    {
      name: 'pickupDate',
      title: 'Pickup Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'returnDate',
      title: 'Return Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required()
    }
  ]
}
