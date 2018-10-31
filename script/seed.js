'use strict'

const db = require('../server/db')
const {User, Product, Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

const users = await Promise.all([
  User.create({isAdmin: true, firstName: 'Beyonce', lastName: 'Knowles', email: 'bknowles@email.com', password: '123'}),
  User.create({isAdmin: false, firstName: 'Lady', lastName: 'Gaga', email: 'ladyG@email.com', password: 'bradley'}),
])

const products = await Promise.all([
  Product.create({title: "After the rain", description: "OMG!!!", price: 5, inventory: 10, imageUrl: 'https://media.mnn.com/assets/images/2017/03/raindrops-plants-smell.jpg.653x0_q80_crop-smart.jpg'}),
  Product.create({title: "Lavender", description: "SOOOO RELAXING!!!", price: 1, inventory: 10, imageUrl: 'https://www.newdirectionsaromatics.ca/images/products/main/lavender.jpg'}),
  Product.create({title: "Leather", description: "It's vegan (kind of...)!!!", price: 12, inventory: 10, imageUrl: 'http://3.bp.blogspot.com/-whnhaCVnKpQ/TfJ-rm-kkhI/AAAAAAAAAj0/RaZdNrsN9xo/s1600/Leather.jpg'}),
  Product.create({title: "Jasmine", description: "GREAATTTTTTTTTTTTTT", price: 112, inventory: 10, imageUrl: 'http://www.tomhealy.us/assets/tumblr_inline_mkp16as0uz1qz4rgp.jpg'}),
  Product.create({title: "Baked bread", description: "WOWOWOWOOW", price: 2, inventory: 10, imageUrl: 'https://static01.nyt.com/images/2017/08/08/insider/simple-crusty-bread/simple-crusty-bread-articleLarge.jpg'}),
  Product.create({title: "Baked cookies", description: "WOWWWWWWWWWWWW", price: 1112, inventory: 10, imageUrl: 'https://images-gmi-pmc.edge-generalmills.com/983f0c5a-2b13-40db-8c92-748b279bcc3f.jpg'})
])

const categories = await Promise.all([
  Category.create({content: "Nourishment"}),
  Category.create({content: "Blossom"}),
  Category.create({content: "You-Do-You"}),
  Category.create({content: "Assorted"})
])

// await Promise.all([
//   After.setCampusId(Saturnalia),
//   Arya.setCampusId(Plutonium),
//   //Boba.setCampusId(Saturnalia),
//   //Grump.setCampusId(Saturnalia),
//   //Dopey.setCampusId(Mars),
//   //E.setCampusId(Jupiter),
//   //Mister.setCampusId(Mercury)
// ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
