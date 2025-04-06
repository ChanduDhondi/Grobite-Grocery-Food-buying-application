import Items from "./models/items.js";
import mongoose from "mongoose";

await mongoose
  .connect(
    "mongodb+srv://chandudhondi23:ZhYwdPZ4qpJ0LYXd@cluster0.xf8u8tv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const meatAndPoultryCategoryId = new mongoose.Types.ObjectId(
  "67f0d2919ff2b416eff59e85"
);

const meatAndPoultryItems = [
  {
    name: "Chicken Breast (Boneless)",
    description: "Fresh, skinless, boneless chicken breast pieces.",
    price: mongoose.Types.Decimal128.fromString("250.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("60"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921309/Chicken_Breast_Boneless_gsn5dg.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Chicken Thighs",
    description: "Juicy chicken thigh cuts with skin.",
    price: mongoose.Types.Decimal128.fromString("230.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("50"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921320/Chicken_Thighs_lj9r2e.jpg",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Mutton Curry Cut",
    description: "Fresh goat meat cut into pieces for curry.",
    price: mongoose.Types.Decimal128.fromString("600.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("40"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921320/Mutton_Curry_Cut_milfwa.webp",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Chicken Drumsticks",
    description: "Tender chicken drumsticks perfect for grilling.",
    price: mongoose.Types.Decimal128.fromString("210.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("70"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921309/Chicken_Drumsticks_qirz5l.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Chicken Keema",
    description: "Minced chicken ready for keema or kebabs.",
    price: mongoose.Types.Decimal128.fromString("260.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("65"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921309/Chicken_Keema_yag9ep.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Mutton Keema",
    description: "Minced goat meat, ideal for mutton keema recipes.",
    price: mongoose.Types.Decimal128.fromString("620.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("30"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921320/Mutton_Keema_mchx4z.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Whole Chicken (With Skin)",
    description: "Whole chicken with skin, ideal for roasting.",
    price: mongoose.Types.Decimal128.fromString("380.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("25"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921321/Whole_Chicken_With_Skin_lel76s.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Chicken Wings",
    description: "Fresh chicken wings ready for frying or grilling.",
    price: mongoose.Types.Decimal128.fromString("200.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("80"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921319/Chicken_Wings_nggemi.jpg",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Turkey Breast",
    description: "Lean and tender turkey breast fillets.",
    price: mongoose.Types.Decimal128.fromString("450.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("20"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921321/Turkey_Breast_frxntu.png",
    category: meatAndPoultryCategoryId,
  },
  {
    name: "Duck Meat",
    description: "Fresh duck meat, pre-cut for curry preparations.",
    price: mongoose.Types.Decimal128.fromString("550.00"),
    stock_quntity: mongoose.Types.Decimal128.fromString("15"),
    imageUrl:
      "https://res.cloudinary.com/dbm0grvut/image/upload/v1743921327/Duck_Meat_nrldq3.jpg",
    category: meatAndPoultryCategoryId,
  },
];

const result = await Items.insertMany(meatAndPoultryItems);

console.log(result);
