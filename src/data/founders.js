import { ClipboardList, CodeXml, Megaphone } from 'lucide-react'
import irvin from '../assets/founders/irvin.jpg'
import ajmal from '../assets/founders/ajmal.jpg'
import shahin from '../assets/founders/shahin.jpg'

/**
 * The three co-founders, in display order.
 *
 *  role             full title (About page)
 *  shortRole        compact title for the small home page tiles
 *  accent           colour of the role chip and hover: 'sky' | 'emerald' | 'violet'
 *  icon             area icon that pops in on the home page photo hover
 *  responsibilities what each person owns (listed on the About page only)
 *  links            profile URLs; empty values are hidden automatically
 */
export const founders = [
  {
    id: 'irvin',
    name: 'Irvin Jacob Sam',
    role: 'Co-Founder & Head of Technology and Development',
    shortRole: 'Head of Technology',
    icon: CodeXml,
    accent: 'sky',
    photo: irvin,
    responsibilities: ['Website development', 'Technical architecture', 'Coding and implementation', 'Hosting and deployment'],
    bio: 'Leads everything technical at WEBROS, from planning the architecture to writing the code and putting it live. Every build goes through his hands before it ships.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'shahin',
    name: 'Shahin Sha R',
    role: 'Co-Founder & Head of Projects and Coordination',
    shortRole: 'Head of Projects',
    icon: ClipboardList,
    accent: 'emerald',
    photo: shahin,
    responsibilities: ['Project coordination', 'Client requirements', 'Project planning and delivery', 'Business and sales'],
    bio: 'Your main point of contact from the first conversation to launch day. Turns what you need into a clear plan, keeps the project on track and makes sure it’s delivered as agreed.',
    links: { linkedin: '', github: '' },
  },
  {
    id: 'ajmal',
    name: 'Ajmal Khan VS',
    role: 'Co-Founder & Head of Marketing and Management',
    shortRole: 'Head of Marketing',
    icon: Megaphone,
    accent: 'violet',
    photo: ajmal,
    responsibilities: [
      'Marketing strategy',
      'Brand development',
      'Digital marketing',
      'Social media management',
      'Partnerships and business growth',
    ],
    bio: 'Shapes how WEBROS shows up in the market, from brand and marketing strategy to social media. Builds the partnerships that help the business grow.',
    links: { linkedin: '', github: '' },
  },
]
