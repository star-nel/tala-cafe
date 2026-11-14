export const categories = ['Coffee', 'Breakfast', 'Mains', 'Desserts']

export const menuItems = [
  { id: 'c1', category: 'Coffee', name: 'Kapeng Barako', description: 'Bold Batangas coffee with deep chocolate notes and a smooth finish.', price: 145, badge: 'Local' },
  { id: 'c2', category: 'Coffee', name: 'Kapeng Latte', description: 'Locally roasted espresso with silky steamed milk.', price: 180 },
  { id: 'c3', category: 'Coffee', name: 'Dirty Matcha', description: 'Stone-ground matcha poured over milk with a double shot of espresso.', price: 220, badge: "Chef's pick" },
  { id: 'c4', category: 'Coffee', name: 'Ube Cloud Latte', description: 'Espresso, creamy ube, and a soft cap of chilled milk foam.', price: 205, badge: 'Customer favorite' },
  { id: 'c5', category: 'Coffee', name: 'Calamansi Cold Brew', description: 'Slow-steeped coffee brightened with a lively calamansi twist.', price: 195 },
  { id: 'c6', category: 'Coffee', name: 'Tablea Mocha', description: 'Rich local cacao and espresso finished with steamed milk.', price: 210, badge: 'Best seller' },
  { id: 'b1', category: 'Breakfast', name: 'Tapsilog', description: 'Garlic beef tapa, sinangag, and a sunny-side-up egg.', price: 295, badge: 'Best seller' },
  { id: 'b2', category: 'Breakfast', name: 'Longsilog', description: 'Sweet-savory longganisa with garlic rice and egg.', price: 275 },
  { id: 'b3', category: 'Breakfast', name: 'Ensaymada French Toast', description: 'Buttery ensaymada griddled golden with fresh fruit.', price: 245, badge: 'Customer favorite' },
  { id: 'b4', category: 'Breakfast', name: 'Pandesal Breakfast Sandwich', description: 'Warm pandesal, soft scrambled egg, and kesong puti.', price: 225, badge: 'Local' },
  { id: 'b5', category: 'Breakfast', name: 'Tsokolate Champorado', description: 'Slow-cooked rice and tablea cacao with a swirl of milk.', price: 210 },
  { id: 'b6', category: 'Breakfast', name: 'Tocilog', description: 'House-cured tocino, garlic rice, and a farm-fresh egg.', price: 280 },
  { id: 'm1', category: 'Mains', name: 'Chicken Inasal Rice Plate', description: 'Chargrilled chicken, atchara, and fragrant garlic rice.', price: 365, badge: 'Local' },
  { id: 'm2', category: 'Mains', name: 'Chicken Pastel Pasta', description: 'Creamy chicken and mushroom sauce tossed with fresh pasta.', price: 345 },
  { id: 'm3', category: 'Mains', name: 'Laing and Rice Bowl', description: 'Bicol-style taro leaves simmered in coconut milk.', price: 310, badge: 'Vegetarian' },
  { id: 'm4', category: 'Mains', name: 'Beef Kare-Kare Bowl', description: 'Slow-braised beef, peanut sauce, vegetables, and rice.', price: 395, badge: "Chef's pick" },
  { id: 'm5', category: 'Mains', name: 'Pork Sisig Rice Bowl', description: 'Sizzling-style pork sisig, garlic rice, and a bright calamansi kick.', price: 375, badge: 'Best seller' },
  { id: 'm6', category: 'Mains', name: 'Pancit Canton', description: 'Stir-fried noodles with crisp vegetables and citrus.', price: 325 },
  { id: 'm7', category: 'Mains', name: 'Adobo Mushroom Rice Bowl', description: 'Savory soy-vinegar mushrooms with steamed rice.', price: 315, badge: 'Vegetarian' },
  { id: 'd1', category: 'Desserts', name: 'Ube Cheesecake', description: 'Creamy ube cheesecake on a buttery crumb crust.', price: 195, badge: 'Customer favorite' },
  { id: 'd2', category: 'Desserts', name: 'Leche Flan', description: 'Silky custard with a delicate golden caramel.', price: 145, badge: 'Local' },
  { id: 'd3', category: 'Desserts', name: 'Mango Graham Cake', description: 'Layers of sweet mango, cream, and graham biscuit.', price: 185, badge: 'Best seller' },
  { id: 'd4', category: 'Desserts', name: 'Turon à la Mode', description: 'Crisp banana turon served warm with vanilla ice cream.', price: 175 },
  { id: 'd5', category: 'Desserts', name: 'Bibingka Cake', description: 'Soft rice cake with coconut, salted egg, and kesong puti.', price: 165 },
  { id: 'd6', category: 'Desserts', name: 'Halo-Halo Parfait', description: 'A chilled, colorful mix of sweet Filipino favorites and cream.', price: 220, badge: 'Customer favorite' },
]

export const formatPrice = (price) => new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
}).format(price)
