import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {
      name: 'details',
      title: 'Project Details',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'links',
      title: 'Links & Socials',
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    // --- DETAILS GROUP ---
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required().min(3).error('Project Title is required and must be at least 3 characters.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required. Click Generate to build it from the title.'),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'If active, the project will display in the Featured Work section of the homepage.',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Determines the sorting order of featured projects (ascending).',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.integer().min(1).error('Display order must be a positive integer.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Web Design', value: 'Web Design'},
          {title: 'UI/UX', value: 'UI/UX'},
          {title: 'Frontend Development', value: 'Frontend Development'},
          {title: 'Full Stack', value: 'Full Stack'},
          {title: 'Branding', value: 'Branding'},
          {title: 'Case Study', value: 'Case Study'},
        ],
      },
      validation: (Rule) => Rule.required().error('Category selection is required.'),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Completion Year',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.regex(/^\d{4}$/, {name: 'year'}).warning('Should be a 4-digit year format (e.g. 2024).'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Completed', value: 'Completed'},
          {title: 'Ongoing', value: 'Ongoing'},
          {title: 'Concept', value: 'Concept'},
        ],
      },
      initialValue: 'Completed',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Used for hover and grid-preview descriptions. Keep it brief.',
      type: 'text',
      group: 'details',
      rows: 3,
      validation: (Rule) => Rule.required().max(250).warning('Keep the short description under 250 characters.'),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      description: 'Detailed description explaining project parameters and execution.',
      type: 'text',
      group: 'details',
      rows: 6,
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      description: 'List of highlights, tools, frameworks, and technologies used (e.g. React, Tailwind CSS).',
      type: 'array',
      group: 'details',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),

    // --- MEDIA GROUP ---
    defineField({
      name: 'image',
      title: 'Cover Image',
      description: 'The primary desktop image showcase for the project.',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Cover Image is required.'),
    }),
    defineField({
      name: 'featuredImageAlt',
      title: 'Alt Text for Cover Image',
      description: 'Important for accessibility and SEO describing what the cover image contains.',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required().error('Alt text is required for the cover image.'),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Mockup Image',
      description: 'Optional overlapping mobile mockup image. If left blank, the first image in Gallery Images will be used.',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      description: 'Overlapping mobile screens, secondary mockups, or case study gallery items.',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    // --- LINKS GROUP ---
    defineField({
      name: 'liveUrl',
      title: 'Live Project URL',
      type: 'url',
      group: 'links',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a valid URL.'),
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      group: 'links',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a valid URL.'),
    }),
    defineField({
      name: 'behanceUrl',
      title: 'Behance URL',
      type: 'url',
      group: 'links',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a valid URL.'),
    }),
    defineField({
      name: 'figmaUrl',
      title: 'Figma URL',
      type: 'url',
      group: 'links',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }).error('Must be a valid URL.'),
    }),

    // --- SEO GROUP ---
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      description: 'Title for browser tab and search results. Typically under 60 characters.',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60).warning('SEO titles should be under 60 characters.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      description: 'Description for search results. Typically under 160 characters.',
      type: 'text',
      group: 'seo',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('SEO descriptions should be under 160 characters.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
