'use strict'

const db = require('../server/db')
const {User, Product, Category, Order, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true}) 
  console.log('db synced!')

const categories = await Promise.all([
  Category.create({content: "Nourishment"}),//5, 6, 9, 10, 12, 13
  Category.create({content: "Blossom"}),//2, 4, 17
  Category.create({content: "You-Do-You"}),//3, 7, 10, 11, 14
  Category.create({content: "I'm feeling lucky!"}),//3, 4, 8, 9, 12, 14, 15, 19
  Category.create({content: "Nature"}), //1, 2, 4, 16, 17, 20
])

const users = await Promise.all([
  User.create({isAdmin: true, firstName: 'Beyonce', lastName: 'Knowles', email: 'bknowles@email.com', password: '123'}),
  User.create({isAdmin: true, firstName: 'Justin', lastName: 'Bieber', email: 'jb@email.com', password: 'biebs'}),
  User.create({isAdmin: false, firstName: 'Drake', lastName: 'Graham', email: 'drake@email.com', password: 'kiki'}),
  User.create({isAdmin: false, firstName: 'Chimamanda Ngozi', lastName: 'Adichie', email: 'americanah@email.com', password: 'abc'}),
  User.create({isAdmin: false, firstName: 'Lady', lastName: 'Gaga', email: 'ladyG@email.com', password: 'bradley'}),
])

const products = await Promise.all([
  Product.create({
    title: "After the rain", description: "OMG!!!", price: 5, inventory: 10, 
    imageUrl: 'https://media.mnn.com/assets/images/2017/03/raindrops-plants-smell.jpg.653x0_q80_crop-smart.jpg',
    //plantr seed file
  }),
    //  .then(product => product.setCategories([categories[5]])),
  Product.create({title: "Lavender", description: "SOOOO RELAXING!!!", price: 1, inventory: 10, imageUrl: 'https://www.newdirectionsaromatics.ca/images/products/main/lavender.jpg'}),
  Product.create({title: "Leather", description: "It's vegan (kind of...)!!!", price: 12, inventory: 10, imageUrl: 'http://3.bp.blogspot.com/-whnhaCVnKpQ/TfJ-rm-kkhI/AAAAAAAAAj0/RaZdNrsN9xo/s1600/Leather.jpg'}),
  Product.create({title: "Jasmine", description: "GREAATTTTTTTTTTTTTT", price: 112, inventory: 10, imageUrl: 'http://www.tomhealy.us/assets/tumblr_inline_mkp16as0uz1qz4rgp.jpg'}),
  Product.create({title: "Baked bread", description: "WOWOWOWOOW", price: 2, inventory: 10, imageUrl: 'https://static01.nyt.com/images/2017/08/08/insider/simple-crusty-bread/simple-crusty-bread-articleLarge.jpg'}),
  Product.create({title: "Baked cookies", description: "WOWWWWWWWWWWWW", price: 1112, inventory: 10, imageUrl: 'https://images-gmi-pmc.edge-generalmills.com/983f0c5a-2b13-40db-8c92-748b279bcc3f.jpg'}),
  Product.create({title: "Nail polish", description: "Judgement free zone", price: 1, inventory: 10, imageUrl: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2015%2F06%2F061615-nail-polish.jpg%3Fitok%3DLmYZ0UaT&w=800&c=sc&poi=face&q=70'}),
  Product.create({title: "Crisp dollar bills", description: "GREEEEEEN", price: 1, inventory: 10, imageUrl: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i0Jd2j3jQBfA/v1/800x-1.jpg'}),
  Product.create({title: "Coconut", description: "DO NOT USE FOR COOKING!!! But moisturizer, ok!", price: 1, inventory: 10, imageUrl: 'https://images.agoramedia.com/everydayhealth/gcms/all-about-coconut-722x406.jpg'}),
  Product.create({title: "Permanent marker", description: "Seriously?", price: 1, inventory: 10, imageUrl: 'https://dharma-www.s3.amazonaws.com/images/eng/products/fullsize/sfp-101.jpg'}),
  Product.create({title: "Sauteed Garlic", description: "AMAZZZZZINGGGGGGGG!!!", price: 1, inventory: 10, imageUrl: 'https://howtofeedaloon.com/wp-content/uploads/2015/04/porterhouse-sauteed-garlic.jpg'}),
  Product.create({title: "A new car", description: "Out of this world!!!", price: 1, inventory: 10, imageUrl: 'http://www.todayifoundout.com/wp-content/uploads/2014/12/new-car.jpg'}),
  Product.create({title: "Chocolate", description: "Cliche much?", price: 1, inventory: 10, imageUrl: 'https://amp.businessinsider.com/images/5a4422b2b0bcd5e3178b70a3-2732-1366.jpg'}),
  Product.create({title: "Citrus", description: "Oranges, grapefruit, galore!!!", price: 1, inventory: 10, imageUrl: 'https://www.rachaelraymag.com/.image/t_share/MTUwNjM0OTEwODUwMjI5NjI0/dried-citrus-103145847.jpg'}),
  Product.create({title: "Clothes fresh out of the dryer", description: "Dryer sheets not included", price: 1, inventory: 10, imageUrl: 'https://i.imgflip.com/2fw2je.jpg'}),
  Product.create({title: "Old books", description: "Priceless", price: 100000, inventory: 10, imageUrl: 'https://flipsy.com/article/wp-content/uploads/2013/05/Old-Vintage-Books.jpg'}),
  Product.create({title: "Sea breeze", description: "Stay breezy!", price: 1, inventory: 10, imageUrl: 'https://s-ec.bstatic.com/images/hotel/max1024x768/700/70020350.jpg'}),
  Product.create({title: "Roses", description: "A rose for a rose", price: 1, inventory: 10, imageUrl: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=68949c212865a1a514722f8bcaa364e9&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'}),
  Product.create({title: "Baby's hair", description: "Again, judgement free zone...", price: 1, inventory: 10, imageUrl: 'https://www.ntd.tv/inspiring/assets/uploads/2018/01/2442-NTD-baby-640x359.jpg'}),
  Product.create({title: "Cold mountain air", description: "Serenity", price: 1, inventory: 10, imageUrl: 'http://www.srs.fs.usda.gov/compass/wp-content/uploads/2016/09/09.27.Cold-air-drainage-flows-subsidize-montane-valley-ecosystem-productivity_Eric-Haggart_TimelessMomentsImaging.jpg'}),
])

const orders = await Promise.all([
  Order.create({isCart: true, total: 20, status: 'Created'}),
  Order.create({isCart: true, total: 30, status: 'Processing'}),
  Order.create({isCart: false, total: 2, status: 'Cancelled'}),
  Order.create({isCart: false, total: 1, status: 'Completed'}),
  Order.create({isCart: false, total: 3, status: 'Completed'}),
  Order.create({isCart: true, total: 20, status: 'Created'}),
  Order.create({isCart: true, total: 30, status: 'Processing'}),
  Order.create({isCart: false, total: 2, status: 'Cancelled'}),
  Order.create({isCart: false, total: 1, status: 'Completed'}),
  Order.create({isCart: false, total: 3, status: 'Completed'}),
])

  // await Promise.all([
  //   products[1].setCateogories([categories[1]])
  // ])

// const reviews = await Promise.all([
//   Review.create({ userId: 3, productId: 1, content: 'Heavenly.  Out of this world!!!!!!!!!!!!!!!!'}),
//   Review.create({ userId: 3, productId: 2, content: 'Is this really vegan??????????????????????' }),
//   Review.create({ userId: 5, productId: 3, content: 'WOWOWOWOWOOWWWWWWZERZZZZZ JUST WOW!' }),
//   Review.create({ userId: 5, productId: 4, content: 'I wish they made shampoo out of this stuff!!!!!!!!' }),
//   Review.create({ userId: 4, productId: 4, content: 'WHY???? JUST WHY???? I am gluten free, dammit!!!!'}),
// ])

// const reviews = await Promise.all([
//   Review.create({ content: 'Heavenly.  Out of this world!!!!!!!!!!!!!!!!'}),
//   Review.create({ content: 'Is this really vegan??????????????????????' }),
//   Review.create({ content: 'WOWOWOWOWOOWWWWWWZERZZZZZ JUST WOW!' }),
//   Review.create({ content: 'I wish they made shampoo out of this stuff!!!!!!!!' }),
//   Review.create({ content: 'WHY???? JUST WHY???? I am gluten free, dammit!!!!'}),
// ])

  //confirmations
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${orders.length} orders`)
  //console.log(`seeded ${reviews.length} reviews`)
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
















// TRIED USING PLANTR!!!!!!!!

// 'use strict'

// const db = require('../server/db')
// //const {User, Product, Category, Order, Review} = require('../server/db/models')

// const {
//   category: Category,
//   user: User,
//   product: Product,
// } = db.models

// const categoryData = [
//   {content: "Nourishment"},//5, 6, 9, 10, 12, 13
//   {content: "Blossom"},//2, 4, 17
// ]

// const userData = [
//   {isAdmin: true, firstName: 'Beyonce', lastName: 'Knowles', email: 'bknowles@email.com', password: '123'},
//   {isAdmin: true, firstName: 'Justin', lastName: 'Bieber', email: 'jb@email.com', password: 'biebs'},
// ]

// const productData = [
//   {title: "After the rain", description: "OMG!!!", price: 5, inventory: 10, imageUrl: 'https://media.mnn.com/assets/images/2017/03/raindrops-plants-smell.jpg.653x0_q80_crop-smart.jpg'},
//   {title: "Lavender", description: "SOOOO RELAXING!!!", price: 1, inventory: 10, imageUrl: 'https://www.newdirectionsaromatics.ca/images/products/main/lavender.jpg'},
//   {title: "Leather", description: "It's vegan (kind of...)!!!", price: 12, inventory: 10, imageUrl: 'http://3.bp.blogspot.com/-whnhaCVnKpQ/TfJ-rm-kkhI/AAAAAAAAAj0/RaZdNrsN9xo/s1600/Leather.jpg'},
//   {title: "Jasmine", description: "GREAATTTTTTTTTTTTTT", price: 112, inventory: 10, imageUrl: 'http://www.tomhealy.us/assets/tumblr_inline_mkp16as0uz1qz4rgp.jpg'},
// ]

// // async function seed() {
// //   await db.sync({force: true})
// //   console.log('db synced!')

// const seed = async () => {
//   try {
//       await db.sync({ force: true })
//       console.log('Database synced!')

//       const promiseForInsertedData = Promise.all([
//           // `returning: true` is a postgres option returning representations of
//           // the new data. Otherwise we get back a success report, not instances.
//           Category.bulkCreate(categoryData, { returning: true }),
//           User.bulkCreate(userData, { returning: true }),
//           Product.bulkCreate(productData, { returning: true })
//       ])

//       const [ categories, products ] = await promiseForInsertedData
//       // const [nourishment, blossom] = categories
//       // const [lavender, leather, jasmine] = products

//       // Here we're using Sequelize's 'Magic' methods to set associations.
//       // Each one returns a promise, so we must wrap them in Promise.all
//       // to return a single promise that will resolve when they all complete
//       await Promise.all([
//         products[1].setCategories(categories[1]),
//         // jasmine.setGardener(nourishment),
//         // leather.setVegetables(blossom),
//       ])
//     } catch (e) {
//       console.log('Disaster! Something went wrong!')
//       console.log(err)
//   } finally {
//       console.log('Closing database connection.')
//       db.close()
//   }
// }

// seed()



//   // await Promise.all([
//   //   products[1].setCateogories([categories[1]])
//   // ])



//   //confirmations
//   // console.log(`seeded ${users.length} users`)
//   // console.log(`seeded ${products.length} products`)
//   // console.log(`seeded ${categories.length} categories`)
//   // console.log(`seeded ${orders.length} orders`)
//   //console.log(`seeded ${reviews.length} reviews`)
// //  console.log(`seeded successfully`)


// // // We've separated the `seed` function from the `runSeed` function.
// // // This way we can isolate the error handling and exit trapping.
// // // The `seed` function is concerned only with modifying the database.
// // async function runSeed() {
// //   console.log('seeding...')
// //   try {
// //     await seed()
// //   } catch (err) {
// //     console.error(err)
// //     process.exitCode = 1
// //   } finally {
// //     console.log('closing db connection')
// //     await db.close()
// //     console.log('db connection closed')
// //   }
// // }

// // // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // // `Async` functions always return a promise, so we can use `catch` to handle
// // // any errors that might occur inside of `seed`.
// // if (module === require.main) {
// //   runSeed()
// // }

// // // we export the seed function for testing purposes (see `./seed.spec.js`)
// // module.exports = seed
