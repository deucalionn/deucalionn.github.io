export const profile = {
  username: 'deucalionn',
  fullName: 'Lucas PEREIRA',
  birthDate: new Date(2004, 3, 3),
  location: 'Bordeaux / Toulouse',
  avatar: '/avatar.png',
  saas: { name: 'AImmo', url: 'https://ai-immo.fr' },
  stacks: [
    'Python',
    'FastAPI',
    'Django',
    'Solidity & EVM',
    'Docker',
    'Next.js',
    'React',
    'LangChain',
    'Cursor',
    'Data analyse',
    'ML',
  ],
  socials: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/lcs.pereira_?igsh=MTh5dTkzNTJzY25jNg==',
    },
    {
      label: 'X (Twitter)',
      url: 'https://x.com/DeucalionK_',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/deucalionn',
    },
  ],
} as const;

export function getAge(birthDate: Date, now = new Date()): number {
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}
