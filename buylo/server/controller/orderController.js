import { client } from "../config/database.js";
import { isAddressValid } from "../utils/validators.js";

export const addShippingAddress = async (req, res) => {
  const { userId, address_line_1, address_line_2, city, state, zipcode } =
    req.body;

  try {
    //All input fields validation || Passed ✅
    if (!address_line_1 || !city || !state || !zipcode) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    //Valid address validation || Passed ✅
    if (!isAddressValid(address_line_1)) {
      return res.status(400).json({ message: "Invalid address" });
    }

    //City length validation || Passed ✅
    if (city.trim().length < 3) {
      return res.status(400).json({ message: "City is too short" });
    }

    //Valid zip code validation || Passed ✅
    if (zipcode.length < 5) {
      return res.status(400).json({ message: "Zip code is invalid" });
    }

    await client.query(
      `
      UPDATE users
      SET address_line_1=$1, address_line_2=$2, city=$3, state=$4, zipcode=$5
      WHERE id=$6
      `,
      [address_line_1, address_line_2, city, state, zipcode, userId],
    );

    return res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createNewOrder = async (req, res) => {
  const { userId, cartId } = req.body;

  if (!userId || !cartId) {
    return res.status(400).json({ message: "Data not provided" });
  }

  try {
    await client.query("BEGIN");

    //Get users' shipping address
    const userInfo = await client.query(
      `
      SELECT json_agg(json_build_object('address_line_1', u.address_line_1, 
      'address_line_2', u.address_line_2, 
      'city', u.city, 'state', u.state, 
      'zipcode', u.zipcode)) as shipping_address
      FROM users u
      WHERE id=$1
      `,
      [userId],
    );

    if (userInfo.rows[0].shipping_address === null) {
      return res
        .status(400)
        .json({ message: "Shipping address not available" });
    }

    const shippingAddress = userInfo.rows[0].shipping_address[0];

    const cartCheck = await client.query(
      "SELECT id FROM cart WHERE id=$1 AND user_id=$2",
      [cartId, userId],
    );

    if (!cartCheck.rows[0]) {
      return res.status(403).json({ message: "Invalid cart" });
    }

    const userCartId = cartCheck.rows[0].id;

    const cartItems = await client.query(
      `
      SELECT json_agg(json_build_object('product_id', p.id, 'quantity', ci.quantity, 
      'price_at_add', ci.price_at_add)) as items_ordered,
      c.total_price
      FROM cart c
      JOIN cart_items ci
      ON c.id=ci.cart_id
      JOIN products p
      ON ci.product_id=p.id
      WHERE c.user_id=$1
      GROUP BY c.total_price
      `,
      [userId],
    );

    if (cartItems.rows[0]?.items_ordered === null) {
      return res.status(400).json({ message: "No items in cart" });
    }

    const itemsOrdered = cartItems.rows[0].items_ordered;

    const newOrder = await client.query(
      `
      INSERT INTO orders(user_id, total_price, shipping_address)
      VALUES($1, $2, $3) RETURNING id
      `,
      [userId, cartItems.rows[0].total_price, shippingAddress],
    );

    if (newOrder.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Order not processed. Try again" });
    }

    const orderId = newOrder.rows[0].id;

    for (const item of itemsOrdered) {
      await client.query(
        `
        INSERT INTO order_items(order_id, product_id, quantity, price_at_purchase)
        VALUES($1, $2, $3, $4)
        `,
        [orderId, item.product_id, item.quantity, item.price_at_add],
      );
    }

    //Clear cart items when order is processed successfully
    await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id=$1
      `,
      [userCartId],
    );

    //Clear total price in cart when order is processed successfully
    await client.query(
      `
      UPDATE cart
      SET total_price=0
      WHERE user_id=$1
      `,
      [userId],
    );

    await client.query("COMMIT");

    return res
      .status(201)
      .json({ message: "Order has been processed successfully" });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
