import irvin from '../assets/founders/irvin.jpg'
import ajmal from '../assets/founders/ajmal.jpg'
import shahin from '../assets/founders/shahin.jpg'

/**
 * The three founders. Add profile URLs to `links` to show them —
 * empty values are hidden automatically (no dead links).
 * TODO: personalise each `bio` and `focus` in your own words.
 */
export const founders = [
  {
    id: 'irvin',
    name: 'Irvin Jacob Sam',
    role: 'Founder & Developer',
    photo: irvin,
    focus: ['Front-end engineering', 'Interaction & motion'],
    bio: 'Builds the interfaces our clients’ customers actually touch — obsessing over speed, accessibility and the small details that make a site feel alive.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'ajmal',
    name: 'Ajmal Khan VS',
    role: 'Founder & Developer',
    photo: ajmal,
    focus: ['Web applications', 'APIs & integrations'],
    bio: 'Turns business processes into dependable software — designing the data, APIs and integrations that keep client platforms running smoothly.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'shahin',
    name: 'Shahin Sha R',
    role: 'Founder & Developer',
    photo: shahin,
    focus: ['UI/UX design', 'SEO & performance'],
    bio: 'Shapes how products look, feel and get found — from user flows and design systems to the technical SEO that puts them in front of the right people.',
    links: { linkedin: '', github: '' },
  },
]
