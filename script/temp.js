const {db} = require('./server/db')
const {green, red} = require('chalk')

const {
  campus: Campus,
  student: Student
} = db.models

const campusData = [
  {name: 'Saturnalia', imageUrl: 'https://www.goodfreephotos.com/albums/astrophotography/saturn-close-up.jpg', address: '242 Sauternes Rd', description: "Located in the renowned valley of Sauternes, Satern's Saternalia is the finest sommelier school in this universe."},
  {name: 'Plutonium', imageUrl: 'https://www.stockvault.net/data/2016/08/31/209019/preview16.jpg', address: '132 PlutOhNo Lane', description: "Pluto's Plutonium is the leading school for mining and studying Plutonium."}
]

const studentData = [
  {firstName: 'Emily', lastName: 'Doe', email: 'eDoe@gmail.com', imageUrl: 'http://www.pxleyes.com/images/contests/cute%20alien/thumbs/cute%20alien_4b7c7718ea8cd.jpg', gpa: '3.4'},
  {firstName: 'Arya', lastName: 'Stark', email: 'AStark@Winterfell.com', imageUrl: 'https://vignette.wikia.nocookie.net/gameofthrones/images/5/54/Arya_the_dragon_and_the_wolf_s7.jpg/revision/latest?cb=20170828062911', gpa: '3.7'}
]

const seed = async () => {
  try {
  await db.sync({force: true})
  const promiseForAddedData = Promise.all([
    Campus.bulkCreate(campusData, {returning: true}),
    Student.bulkCreate(studentData, {returning: true})
  ]);

  const [campuses, students] = await promiseForAddedData;
  const [Saturnalia, Plutonium] = campuses;
  const [Emily, Arya] = students;

  await Promise.all([
    Emily.setCampusId(Saturnalia),
    Arya.setCampusId(Plutonium),
    //Boba.setCampusId(Saturnalia),
    //Grump.setCampusId(Saturnalia),
    //Dopey.setCampusId(Mars),
    //E.setCampusId(Jupiter),
    //Mister.setCampusId(Mercury)
  ])
  console.log('db seeded!')
// } catch (err) {
//   console.log('OH NO!!!!', err)
// } finally {
//   console.log('Closing database connection')
//   db.close()
// }
//   console.log(green('Seeding success!'))
//   db.close()
// }

// seed()
//   .catch(err => {
//     console.error(red('Oh noes! Something went wrong!'))
//     console.error(err)
//     db.close()
//   })