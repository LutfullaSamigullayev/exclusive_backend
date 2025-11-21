import { User } from "./user.model.js";
import { Product } from "./product.model.js";
import { Category } from "./category.model.js";
import { Favorite } from "./favorite.model.js";
import { Cart } from "./cart.model.js";
import { Order } from "./order.model.js";
import { OrderItem } from "./order_item.model.js";

User.hasMany(Product, { foreignKey: "seller_id", as: "products" });
Product.belongsTo(User, { foreignKey: "seller_id", as: "seller" });

Category.hasMany(Category, { foreignKey: "parent_id", as: "children" });
Category.belongsTo(Category, { foreignKey: "parent_id", as: "parent" });

Category.hasMany(Product, { foreignKey: "category_id", as: "products_by_category" });
Product.belongsTo(Category, { foreignKey: "category_id", as: "category" });

User.hasMany(Favorite, { foreignKey: "user_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "user_id", as: "user" });

Product.hasMany(Favorite, { foreignKey: "product_id", as: "favorites" });
Favorite.belongsTo(Product, { foreignKey: "product_id", as: "product" });

User.belongsToMany(Product, { through: Favorite, foreignKey: "user_id", otherKey: "product_id", as: "favorite_products" });
Product.belongsToMany(User, { through: Favorite, foreignKey: "product_id", otherKey: "user_id", as: "favorited_by" });

User.hasMany(Order, { foreignKey: "user_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "user_id", as: "user" });

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id", as: "order" });

Product.hasMany(OrderItem, { foreignKey: "product_id", as: "order_items" });
OrderItem.belongsTo(Product, { foreignKey: "product_id", as: "product" });
User.hasMany(Cart, { foreignKey: "user_id", as: "cart_items" });
Cart.belongsTo(User, { foreignKey: "user_id", as: "user" });

Product.hasMany(Cart, { foreignKey: "product_id", as: "cart_items" });
Cart.belongsTo(Product, { foreignKey: "product_id", as: "product" });

User.belongsToMany(Product, { through: Cart, foreignKey: "user_id", otherKey: "product_id", as: "cart_products" });
Product.belongsToMany(User, { through: Cart, foreignKey: "product_id", otherKey: "user_id", as: "in_carts" });

export { User, Product, Category, Favorite, Cart, Order, OrderItem };
