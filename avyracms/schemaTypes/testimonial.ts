import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Client Name is required.'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required().error('Company name is required.'),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'e.g. Founder, CEO, CTO',
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'project',
      title: 'Project Name',
      description: 'Name of the project this client worked on with Avyra.',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      description: 'Client rating from 1 to 5 stars.',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(5)
          .error('Rating must be an integer between 1 and 5.'),
      initialValue: 5,
    }),
    defineField({
      name: 'review',
      title: 'Review',
      description: 'The testimonial statement / review text.',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Review content is required.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'If active, this testimonial will be displayed in the testimonials section of the website.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Sorting order for testimonials (ascending).',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).error('Display order must be a positive integer.'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'image',
    },
  },
})
