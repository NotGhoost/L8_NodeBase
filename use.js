import { sortStringsIgnoringSpaces } from './modules/sortStrings.js';
import { createFolder, writeFile } from './modules/fsTools.js';

const usersMock = [
  { name: 'Leanne Graham', email: 'leanne@example.com' },
  { name: 'Ervin Howell', email: 'ervin@example.com' },
  { name: 'Clementine Bauch', email: 'clementine@example.com' },
  { name: 'Patricia Lebsack', email: 'patricia@example.com' },
  { name: 'Chelsey Dietrich', email: 'chelsey@example.com' }
];

async function main() {
  const names = usersMock.map(u => u.name);
  const sortedNames = sortStringsIgnoringSpaces(names);

  const sortedUsers = sortedNames.map(n => usersMock.find(u => u.name === n));

  await createFolder('users');

  const namesContent = sortedUsers.map(u => u.name).join('\n');
  const emailsContent = sortedUsers.map(u => u.email).join('\n');

  await writeFile('users/names.txt', namesContent);
  await writeFile('users/emails.txt', emailsContent);

  console.log('Users folder prepared: users/names.txt and users/emails.txt');
}

main().catch(err => {
  console.error('Error in use.js:', err);
});
