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
    role: 'Founder & Lead Developer',
    photo: irvin,
    focus: ['Full-stack development', 'Architecture & code quality'],
    bio: 'Leads the coding side of every project, from the interface to the server. He sets the technical direction and keeps every build fast, secure and easy to grow.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'ajmal',
    name: 'Ajmal Khan VS',
    role: 'Founder & Web Application Developer',
    photo: ajmal,
    focus: ['Web applications', 'APIs & integrations'],
    bio: 'Turns business processes into dependable software — designing the data, APIs and integrations that keep client platforms running smoothly.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'shahin',
    name: 'Shahin Sha R',
    role: 'Founder & Design Lead',
    photo: shahin,
    focus: ['UI/UX design', 'SEO & performance'],
    bio: 'Shapes how products look, feel and get found — from user flows and design systems to the technical SEO that puts them in front of the right people.',
    links: { linkedin: '', github: '' },
  },
]
