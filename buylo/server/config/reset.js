import { client } from './database.js';
import products from '../data/products.js';
import users from '../data/users.js';

const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS products CASCADE; 
        DROP TABLE IF EXISTS users CASCADE; 

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            current_quantity INTEGER NOT NULL DEFAULT 0,
            category VARCHAR(100),
            description TEXT,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- PURPOSE: Automatically refreshes 'updated_at' on row modification.
        -- LOGIC: Intercepts UPDATE operations to set the current timestamp before saving.
        CREATE OR REPLACE FUNCTION update_modified_column()
        RETURNS TRIGGER AS $$
        BEGIN
            -- Set the updated_at column to the current timestamp
            NEW.updated_at = now();

            -- Return the modified record to continue the update process
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            phone_number VARCHAR(20),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            address_line_1 TEXT,
            address_line_2 TEXT,
            city VARCHAR(100),
            state VARCHAR(100),
            zipcode VARCHAR(20),
            user_type VARCHAR(20) DEFAULT 'customer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TRIGGER update_user_modtime
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE update_modified_column();
        `;

    try {
        await client.query(createTableQuery);
        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error creating tables", err);
        throw err;
    }
};

const seedDatabase = async () => {
    try {
        await createTables();
        
        // 1. Insert Products
        for (const product of products) {
            const insertProductQuery = {
                text: `INSERT INTO products (name, price, current_quantity, category, description, image_url) 
                       VALUES ($1, $2, $3, $4, $5, $6)`,
                values: [
                    product.name,
                    product.price,
                    product.current_quantity,
                    product.category,
                    product.description,
                    product.image_url
                ]
            };
            await client.query(insertProductQuery);
            console.log(`Product "${product.name}" inserted`);
        }

        // 2. Insert Users
        for (const user of users) {
            const insertUserQuery = {
                text: `INSERT INTO users (
                        first_name, last_name, phone_number, email, password, 
                        address_line_1, address_line_2, city, state, zipcode, user_type
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                values: [
                    user.first_name,
                    user.last_name,
                    user.phone_number,
                    user.email,
                    user.password,
                    user.address_line_1,
                    user.address_line_2,
                    user.city,
                    user.state,
                    user.zipcode,
                    user.user_type
                ]
            };
            await client.query(insertUserQuery);
            console.log(`User "${user.first_name}" inserted`);
        }

        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        await client.end();
    }
};

seedDatabase();