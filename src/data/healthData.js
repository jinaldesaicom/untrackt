export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Sedentary (desk job, no exercise)', multiplier: 1.2 },
  { id: 'light', label: 'Lightly active (1-3 days/week)', multiplier: 1.375 },
  { id: 'moderate', label: 'Moderately active (3-5 days/week)', multiplier: 1.55 },
  { id: 'very', label: 'Very active (6-7 days/week)', multiplier: 1.725 },
  { id: 'extreme', label: 'Extremely active (physical job + daily training)', multiplier: 1.9 },
]

export const ALCOHOL_PRESETS = [
  { label: 'Pint of beer', volume: 568, abv: 4 },
  { label: 'Small glass wine', volume: 125, abv: 12 },
  { label: 'Large glass wine', volume: 250, abv: 12 },
  { label: 'Single spirit', volume: 25, abv: 40 },
  { label: 'Double spirit', volume: 50, abv: 40 },
  { label: 'Bottle of beer', volume: 330, abv: 5 },
  { label: 'Glass of prosecco', volume: 125, abv: 11 },
]

export const MET_ACTIVITIES = {
  Cardio: [
    ['Running', 9.8], ['Walking', 3.8], ['Cycling', 7.5], ['Swimming', 8.0], ['Rowing', 7.0], ['Jump rope', 11.8],
    ['Elliptical', 5.0], ['Stair climbing', 8.8], ['HIIT', 10.0], ['Aerobics', 6.5], ['Dancing', 5.5], ['Hiking', 6.0],
  ],
  Sports: [
    ['Basketball', 8.0], ['Football', 7.0], ['Tennis', 7.3], ['Badminton', 5.5], ['Volleyball', 4.0], ['Boxing', 12.8],
    ['Martial arts', 10.3], ['Rock climbing', 8.0], ['Yoga', 2.8], ['Pilates', 3.0],
  ],
  Strength: [
    ['Weight training', 5.0], ['Bodyweight exercises', 4.3], ['CrossFit', 8.0], ['Kettlebells', 8.0], ['Resistance bands', 3.5],
  ],
  Daily: [
    ['Housework', 3.5], ['Gardening', 4.0], ['Walking (slow)', 2.5], ['Standing', 1.8], ['Cooking', 2.0],
  ],
}

export const VACCINATION_SCHEDULES = {
  US: [
    { age: 'Birth', vaccines: [{ name: 'HepB', disease: 'Hepatitis B', doses: '1', type: 'Injection' }] },
    { age: '2 months', vaccines: [{ name: 'DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '1', type: 'Injection' }, { name: 'IPV', disease: 'Polio', doses: '1', type: 'Injection' }, { name: 'Hib', disease: 'Haemophilus influenzae type b', doses: '1', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '1', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '1', type: 'Oral' }] },
    { age: '4 months', vaccines: [{ name: 'DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '2', type: 'Injection' }, { name: 'IPV', disease: 'Polio', doses: '2', type: 'Injection' }, { name: 'Hib', disease: 'Haemophilus influenzae type b', doses: '2', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '2', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '2', type: 'Oral' }] },
    { age: '6 months', vaccines: [{ name: 'DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '3', type: 'Injection' }, { name: 'HepB', disease: 'Hepatitis B', doses: '3', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '3', type: 'Injection' }, { name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
    { age: '12 months', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '1', type: 'Injection' }, { name: 'Varicella', disease: 'Chickenpox', doses: '1', type: 'Injection' }, { name: 'HepA', disease: 'Hepatitis A', doses: '1', type: 'Injection' }] },
    { age: '15-18 months', vaccines: [{ name: 'DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '4', type: 'Injection' }, { name: 'Hib', disease: 'Haemophilus influenzae type b', doses: 'Final', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: 'Final', type: 'Injection' }] },
    { age: '2 years', vaccines: [{ name: 'HepA', disease: 'Hepatitis A', doses: '2', type: 'Injection' }] },
    { age: '4-6 years', vaccines: [{ name: 'DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '5', type: 'Injection' }, { name: 'IPV', disease: 'Polio', doses: 'Final', type: 'Injection' }, { name: 'MMR', disease: 'Measles, mumps, rubella', doses: '2', type: 'Injection' }, { name: 'Varicella', disease: 'Chickenpox', doses: '2', type: 'Injection' }] },
    { age: '11-12 years', vaccines: [{ name: 'Tdap', disease: 'Tetanus, diphtheria, pertussis', doses: 'Booster', type: 'Injection' }, { name: 'HPV', disease: 'Human papillomavirus', doses: 'Series', type: 'Injection' }, { name: 'MenACWY', disease: 'Meningococcal disease', doses: '1', type: 'Injection' }] },
    { age: '16 years', vaccines: [{ name: 'MenACWY', disease: 'Meningococcal disease', doses: 'Booster', type: 'Injection' }] },
    { age: '18+ years', vaccines: [{ name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }, { name: 'COVID-19', disease: 'COVID-19', doses: 'Per guidance', type: 'Injection' }] },
  ],
  UK: [
    { age: 'Birth', vaccines: [{ name: 'BCG', disease: 'Tuberculosis (risk groups)', doses: '1', type: 'Injection' }, { name: 'HepB', disease: 'Hepatitis B (risk groups)', doses: '1', type: 'Injection' }] },
    { age: '2 months', vaccines: [{ name: '6-in-1', disease: 'Diphtheria, tetanus, pertussis, polio, Hib, HepB', doses: '1', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '1', type: 'Oral' }, { name: 'MenB', disease: 'Meningococcal B', doses: '1', type: 'Injection' }] },
    { age: '4 months', vaccines: [{ name: '6-in-1', disease: 'Diphtheria, tetanus, pertussis, polio, Hib, HepB', doses: '2', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '2', type: 'Oral' }, { name: 'MenB', disease: 'Meningococcal B', doses: '2', type: 'Injection' }] },
    { age: '6 months', vaccines: [{ name: 'Influenza', disease: 'Flu (risk groups)', doses: 'Annual', type: 'Nasal/Injection' }] },
    { age: '12 months', vaccines: [{ name: 'Hib/MenC', disease: 'Hib and meningococcal C', doses: 'Booster', type: 'Injection' }, { name: 'MMR', disease: 'Measles, mumps, rubella', doses: '1', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: 'Booster', type: 'Injection' }, { name: 'MenB', disease: 'Meningococcal B', doses: 'Booster', type: 'Injection' }] },
    { age: '15-18 months', vaccines: [{ name: '4-in-1 preschool booster', disease: 'Diphtheria, tetanus, pertussis, polio', doses: 'Booster', type: 'Injection' }] },
    { age: '2 years', vaccines: [{ name: 'Flu nasal spray', disease: 'Seasonal flu', doses: 'Annual', type: 'Nasal' }] },
    { age: '4-6 years', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '2', type: 'Injection' }] },
    { age: '11-12 years', vaccines: [{ name: 'HPV', disease: 'Human papillomavirus', doses: 'Series', type: 'Injection' }] },
    { age: '16 years', vaccines: [{ name: '3-in-1 teenage booster', disease: 'Tetanus, diphtheria, polio', doses: 'Booster', type: 'Injection' }, { name: 'MenACWY', disease: 'Meningococcal groups A, C, W, Y', doses: '1', type: 'Injection' }] },
    { age: '18+ years', vaccines: [{ name: 'Flu', disease: 'Seasonal flu', doses: 'Annual for eligible groups', type: 'Injection' }] },
  ],
  Australia: [
    { age: 'Birth', vaccines: [{ name: 'HepB', disease: 'Hepatitis B', doses: '1', type: 'Injection' }] },
    { age: '2 months', vaccines: [{ name: 'DTPa-hepB-IPV-Hib', disease: 'Combined infant series', doses: '1', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '1', type: 'Oral' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '1', type: 'Injection' }] },
    { age: '4 months', vaccines: [{ name: 'DTPa-hepB-IPV-Hib', disease: 'Combined infant series', doses: '2', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '2', type: 'Oral' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '2', type: 'Injection' }] },
    { age: '6 months', vaccines: [{ name: 'DTPa-hepB-IPV-Hib', disease: 'Combined infant series', doses: '3', type: 'Injection' }] },
    { age: '12 months', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '1', type: 'Injection' }, { name: 'MenACWY', disease: 'Meningococcal disease', doses: '1', type: 'Injection' }] },
    { age: '15-18 months', vaccines: [{ name: 'DTPa booster', disease: 'Diphtheria, tetanus, pertussis', doses: 'Booster', type: 'Injection' }, { name: 'Varicella', disease: 'Chickenpox', doses: '1', type: 'Injection' }] },
    { age: '2 years', vaccines: [{ name: 'HepA', disease: 'Hepatitis A (specific groups)', doses: 'Series', type: 'Injection' }] },
    { age: '4-6 years', vaccines: [{ name: 'DTPa-IPV', disease: 'Diphtheria, tetanus, pertussis, polio', doses: 'Booster', type: 'Injection' }, { name: 'MMRV', disease: 'Measles, mumps, rubella, varicella', doses: 'Booster', type: 'Injection' }] },
    { age: '11-12 years', vaccines: [{ name: 'HPV', disease: 'Human papillomavirus', doses: 'Series', type: 'Injection' }, { name: 'dTpa', disease: 'Tetanus, diphtheria, pertussis', doses: 'Booster', type: 'Injection' }] },
    { age: '16 years', vaccines: [{ name: 'MenACWY', disease: 'Meningococcal disease', doses: 'Catch-up if needed', type: 'Injection' }] },
    { age: '18+ years', vaccines: [{ name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
  ],
  Canada: [
    { age: 'Birth', vaccines: [{ name: 'HepB', disease: 'Hepatitis B (province dependent)', doses: '1', type: 'Injection' }] },
    { age: '2 months', vaccines: [{ name: 'DTaP-IPV-Hib', disease: 'Combined infant series', doses: '1', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '1', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '1', type: 'Oral' }] },
    { age: '4 months', vaccines: [{ name: 'DTaP-IPV-Hib', disease: 'Combined infant series', doses: '2', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '2', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '2', type: 'Oral' }] },
    { age: '6 months', vaccines: [{ name: 'DTaP-IPV-Hib', disease: 'Combined infant series', doses: '3', type: 'Injection' }, { name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
    { age: '12 months', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '1', type: 'Injection' }, { name: 'MenC', disease: 'Meningococcal C', doses: '1', type: 'Injection' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: 'Booster', type: 'Injection' }] },
    { age: '15-18 months', vaccines: [{ name: 'Varicella', disease: 'Chickenpox', doses: '1', type: 'Injection' }, { name: 'DTaP-IPV-Hib', disease: 'Booster dose', doses: 'Booster', type: 'Injection' }] },
    { age: '2 years', vaccines: [{ name: 'HepA', disease: 'Hepatitis A (specific groups)', doses: 'Series', type: 'Injection' }] },
    { age: '4-6 years', vaccines: [{ name: 'DTaP-IPV', disease: 'Diphtheria, tetanus, pertussis, polio', doses: 'Booster', type: 'Injection' }, { name: 'MMR-V', disease: 'Measles, mumps, rubella, varicella', doses: 'Booster', type: 'Injection' }] },
    { age: '11-12 years', vaccines: [{ name: 'HPV', disease: 'Human papillomavirus', doses: 'Series', type: 'Injection' }, { name: 'Men-C-ACYW', disease: 'Meningococcal disease', doses: 'Booster', type: 'Injection' }] },
    { age: '16 years', vaccines: [{ name: 'Tdap', disease: 'Tetanus, diphtheria, pertussis', doses: 'Catch-up if needed', type: 'Injection' }] },
    { age: '18+ years', vaccines: [{ name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
  ],
  India: [
    { age: 'Birth', vaccines: [{ name: 'BCG', disease: 'Tuberculosis', doses: '1', type: 'Injection' }, { name: 'OPV', disease: 'Polio', doses: '0', type: 'Oral' }, { name: 'HepB', disease: 'Hepatitis B', doses: '1', type: 'Injection' }] },
    { age: '2 months', vaccines: [{ name: 'DTwP/DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '1', type: 'Injection' }, { name: 'IPV/OPV', disease: 'Polio', doses: '1', type: 'Injection/Oral' }, { name: 'Hib', disease: 'Haemophilus influenzae type b', doses: '1', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '1', type: 'Oral' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '1', type: 'Injection' }] },
    { age: '4 months', vaccines: [{ name: 'DTwP/DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '2', type: 'Injection' }, { name: 'IPV/OPV', disease: 'Polio', doses: '2', type: 'Injection/Oral' }, { name: 'Hib', disease: 'Haemophilus influenzae type b', doses: '2', type: 'Injection' }, { name: 'Rotavirus', disease: 'Rotavirus', doses: '2', type: 'Oral' }, { name: 'PCV', disease: 'Pneumococcal disease', doses: '2', type: 'Injection' }] },
    { age: '6 months', vaccines: [{ name: 'DTwP/DTaP', disease: 'Diphtheria, tetanus, pertussis', doses: '3', type: 'Injection' }, { name: 'IPV/OPV', disease: 'Polio', doses: '3', type: 'Injection/Oral' }, { name: 'HepB', disease: 'Hepatitis B', doses: '3', type: 'Injection' }, { name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
    { age: '12 months', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '1', type: 'Injection' }, { name: 'HepA', disease: 'Hepatitis A', doses: '1', type: 'Injection' }] },
    { age: '15-18 months', vaccines: [{ name: 'MMR', disease: 'Measles, mumps, rubella', doses: '2', type: 'Injection' }, { name: 'Varicella', disease: 'Chickenpox', doses: '1', type: 'Injection' }, { name: 'PCV booster', disease: 'Pneumococcal disease', doses: 'Booster', type: 'Injection' }] },
    { age: '2 years', vaccines: [{ name: 'Typhoid conjugate', disease: 'Typhoid', doses: '1', type: 'Injection' }] },
    { age: '4-6 years', vaccines: [{ name: 'DTwP/DTaP booster', disease: 'Diphtheria, tetanus, pertussis', doses: 'Booster', type: 'Injection' }, { name: 'OPV booster', disease: 'Polio', doses: 'Booster', type: 'Oral' }, { name: 'MMR', disease: 'Measles, mumps, rubella', doses: '3', type: 'Injection' }] },
    { age: '11-12 years', vaccines: [{ name: 'HPV', disease: 'Human papillomavirus', doses: 'Series', type: 'Injection' }, { name: 'Tdap/Td', disease: 'Tetanus, diphtheria, pertussis', doses: 'Booster', type: 'Injection' }] },
    { age: '16 years', vaccines: [{ name: 'Td booster', disease: 'Tetanus, diphtheria', doses: 'Booster', type: 'Injection' }] },
    { age: '18+ years', vaccines: [{ name: 'Influenza', disease: 'Seasonal flu', doses: 'Annual', type: 'Injection' }] },
  ],
}