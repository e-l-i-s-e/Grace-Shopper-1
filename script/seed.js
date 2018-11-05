'use strict'

const db = require('../server/db')
const {User, Product, Category, Order, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true}) 
  console.log('db synced!')

const nourish = await Category.create({id: 1, content: "Nourishment"})
const blossom = await Category.create({id: 2, content: "Blossom"})
const youDoYou = await Category.create({id: 3, content: "You-Do-You"})
const lucky = await Category.create({id: 4, content: "I'm feeling lucky!"})
const nature = await Category.create({id: 5, content: "Nature"})

const users = await Promise.all([
  User.create({isAdmin: true, firstName: 'Beyonce', lastName: 'Knowles', email: 'bknowles@email.com', password: '123'}),
  User.create({isAdmin: true, firstName: 'Justin', lastName: 'Bieber', email: 'jb@email.com', password: 'biebs'}),
  User.create({isAdmin: false, firstName: 'Drake', lastName: 'Graham', email: 'drake@email.com', password: 'kiki'}),
  User.create({isAdmin: false, firstName: 'Chimamanda Ngozi', lastName: 'Adichie', email: 'americanah@email.com', password: 'abc'}),
  User.create({isAdmin: false, firstName: 'Lady', lastName: 'Gaga', email: 'ladyG@email.com', password: 'bradley'}),
])

const products = await Promise.all([
  Product.create({
    id: 1, title: "After the rain", description: "OMG!!!", price: 5.25, inventory: 10, 
    imageUrl: 'https://media.mnn.com/assets/images/2017/03/raindrops-plants-smell.jpg.653x0_q80_crop-smart.jpg',
  }).then(product => product.setCategories([nature])),
  Product.create({
    id: 2, title: "Lavender", description: "SOOOO RELAXING!!!", price: 1.10, inventory: 10, 
    imageUrl: 'https://www.newdirectionsaromatics.ca/images/products/main/lavender.jpg'
  }).then(product => product.setCategories([blossom, nature])),
  Product.create({
    id: 3, title: "Leather", description: "It's vegan (kind of...)!!!", price: 12.25, inventory: 10, 
    imageUrl: 'http://3.bp.blogspot.com/-whnhaCVnKpQ/TfJ-rm-kkhI/AAAAAAAAAj0/RaZdNrsN9xo/s1600/Leather.jpg'
  }).then(product => product.setCategories([youDoYou, lucky])),
  Product.create({
    id: 4, title: "Jasmine", description: "GREAATTTTTTTTTTTTTT", price: 112.12, inventory: 10, 
    imageUrl: 'http://www.tomhealy.us/assets/tumblr_inline_mkp16as0uz1qz4rgp.jpg'
  }).then(product => product.setCategories([blossom, lucky, nature])),
  Product.create({
    id: 5, title: "Baked bread", description: "WOWOWOWOOW", price: 2.50, inventory: 10, 
    imageUrl: 'https://static01.nyt.com/images/2017/08/08/insider/simple-crusty-bread/simple-crusty-bread-articleLarge.jpg'
  }).then(product => product.setCategories([nourish])),
  Product.create({
    id: 6, title: "Baked cookies", description: "WOWWWWWWWWWWWW", price: 1112.45, inventory: 10, 
    imageUrl: 'https://images-gmi-pmc.edge-generalmills.com/983f0c5a-2b13-40db-8c92-748b279bcc3f.jpg'
  }).then(product => product.setCategories([nourish])),
  Product.create({
    id: 7, title: "Nail polish", description: "Judgement free zone", price: 1.01, inventory: 10, 
    imageUrl: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-img.instyle.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F684xflex%2Fpublic%2Fimages%2F2015%2F06%2F061615-nail-polish.jpg%3Fitok%3DLmYZ0UaT&w=800&c=sc&poi=face&q=70'
  }).then(product => product.setCategories([youDoYou])),
  Product.create({
    id: 8, title: "Crisp dollar bills", description: "GREEEEEEN", price: 1.00, inventory: 10, 
    imageUrl: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i0Jd2j3jQBfA/v1/800x-1.jpg'
  }).then(product => product.setCategories([lucky])),
  Product.create({
    id: 9, title: "Coconut", description: "DO NOT USE FOR COOKING!!! But moisturizer, ok!", price: 1.50, inventory: 10, 
    imageUrl: 'https://images.agoramedia.com/everydayhealth/gcms/all-about-coconut-722x406.jpg'
  }).then(product => product.setCategories([nourish, lucky])),
  Product.create({
    id: 10, title: "Permanent marker", description: "Seriously?", price: 0.25, inventory: 10, 
    imageUrl: 'https://dharma-www.s3.amazonaws.com/images/eng/products/fullsize/sfp-101.jpg'
  }).then(product => product.setCategories([youDoYou])),
  Product.create({
    id: 11, title: "Sauteed Garlic", description: "AMAZZZZZINGGGGGGGG!!!", price: 3.45, inventory: 10, 
    imageUrl: 'https://howtofeedaloon.com/wp-content/uploads/2015/04/porterhouse-sauteed-garlic.jpg'
  }).then(product => product.setCategories([nourish, youDoYou])),
  Product.create({
    id: 12, title: "A new car", description: "Out of this world!!!", price: 9.99, inventory: 10, 
    imageUrl: 'http://www.todayifoundout.com/wp-content/uploads/2014/12/new-car.jpg'
  }).then(product => product.setCategories([lucky])),
  Product.create({
    id: 13, title: "Chocolate", description: "Cliche much?", price: 1000.00, inventory: 10, 
    imageUrl: 'https://amp.businessinsider.com/images/5a4422b2b0bcd5e3178b70a3-2732-1366.jpg'
  }).then(product => product.setCategories([nourish])),
  Product.create({
    id: 14, title: "Citrus", description: "Oranges, grapefruit, galore!!!", price: 123.45, inventory: 10, 
    imageUrl: 'https://www.rachaelraymag.com/.image/t_share/MTUwNjM0OTEwODUwMjI5NjI0/dried-citrus-103145847.jpg'
  }).then(product => product.setCategories([nourish, youDoYou, lucky])),
  Product.create({
    id: 15, title: "Clothes fresh out of the dryer", description: "Dryer sheets not included", price: 12.34, inventory: 10, 
    imageUrl: 'https://i.imgflip.com/2fw2je.jpg'
  }).then(product => product.setCategories([lucky])),
  Product.create({
    id: 16, title: "Old books", description: "Priceless", price: 100000, inventory: 10, 
    imageUrl: 'https://flipsy.com/article/wp-content/uploads/2013/05/Old-Vintage-Books.jpg'
  }).then(product => product.setCategories([lucky])),
  Product.create({
    id: 17, title: "Sea breeze", description: "Stay breezy!", price: 17.85, inventory: 10, 
    imageUrl: 'https://s-ec.bstatic.com/images/hotel/max1024x768/700/70020350.jpg'
  }).then(product => product.setCategories([nature])),
  Product.create({
    id: 18, title: "Roses", description: "A rose for a rose", price: 13.27, inventory: 10, 
    imageUrl: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=68949c212865a1a514722f8bcaa364e9&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb'
  }).then(product => product.setCategories([nature, blossom])),
  Product.create({
    id: 19, title: "Baby's hair", description: "Again, judgement free zone...", price: 19.99, inventory: 10, 
    imageUrl: 'https://www.ntd.tv/inspiring/assets/uploads/2018/01/2442-NTD-baby-640x359.jpg'
  }).then(product => product.setCategories([lucky])),
  Product.create({
    id: 20, title: "Cold mountain air", description: "Serenity", price: 1, inventory: 10.50, 
    imageUrl: 'http://www.srs.fs.usda.gov/compass/wp-content/uploads/2016/09/09.27.Cold-air-drainage-flows-subsidize-montane-valley-ecosystem-productivity_Eric-Haggart_TimelessMomentsImaging.jpg'
  }).then(product => product.setCategories([nature])),
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
 
const reviews = await Promise.all([
  Review.create({ productId: 1, userId: 3, numStars: 5, content: 'Heavenly.  Out of this world!!!!!!!!!!!!!!!!'}),
  Review.create({ productId: 2, userId: 3, numStars: 3, content: 'Is this really vegan??????????????????????' }),
  Review.create({ productId: 3, userId: 5, numStars: 4, content: 'WOWOWOWOWOOWWWWWWZERZZZZZ JUST WOW!' }),
  Review.create({ productId: 5, userId: 5, numStars: 5, content: 'I wish they made shampoo out of this stuff!!!!!!!!' }),
  Review.create({ productId: 5, userId: 4, numStars: 1, content: 'WHY???? JUST WHY???? I am gluten free, dammit!!!!'}),
])

// const reviews = await Promise.all([
//   Review.create({ content: 'Heavenly.  Out of this world!!!!!!!!!!!!!!!!'}),
//   Review.create({ content: 'Is this really vegan??????????????????????' }),
//   Review.create({ content: 'WOWOWOWOWOOWWWWWWZERZZZZZ JUST WOW!' }),
//   Review.create({ content: 'I wish they made shampoo out of this stuff!!!!!!!!' }),
//   Review.create({ content: 'WHY???? JUST WHY???? I am gluten free, dammit!!!!'}),
// ])

  //confirmations
  //categories - missing bc removed from the promise.all block
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${reviews.length} reviews`)
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
