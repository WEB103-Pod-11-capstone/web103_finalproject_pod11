import { client } from './database.js';
import products from '../data/products.js';

const createTables = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS products; 
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            current_quantity INTEGER NOT NULL DEFAULT 0,
            category VARCHAR(100),
            description TEXT,
            image_url TEXT
        );
    `;
    
    try {
        await client.query(createTableQuery);
        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error creating tables", err);
        throw err; // Stop the script if table creation fails
    }
};

const seedDatabase = async () => {
    try {
        await createTables();

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
        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        
        await client.end();
    }
};

seedDatabase();