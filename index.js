import 'dotenv/config';

function printEnvInfo() {
  const { NAME, SURNAME, GROUP, NUMBER, MODE } = process.env;

  const fields = [
    { label: 'Name', value: NAME },
    { label: 'Surname', value: SURNAME },
    { label: 'Group', value: GROUP },
    { label: 'Number', value: NUMBER },
    { label: 'Mode', value: MODE }
  ];

  const missing = fields.filter(f => !f.value);
  if (missing.length) {
    console.warn('Warning: Missing env variables:', missing.map(m => m.label).join(', '));
  }

  fields.forEach(f => console.log(`${f.label}: ${f.value ?? '(not set)'}`));
}

printEnvInfo();
