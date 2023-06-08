
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


For the second test this is the sql query:
```
SELECT u.name, u.email, SUM(o.quantity * p.price) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE p.category = 'Electronics'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) >= 3 AND total_spent > 1000
ORDER BY total_spent DESC;
```
Explanation:

The query starts by selecting the user's name (u.name), email (u.email), and the total amount spent on "Electronics" orders (SUM(o.quantity * p.price) AS total_spent).
The FROM clause specifies the tables being used: users u, orders o, and products p.
The JOIN statements are used to establish the relationships between the tables based on the foreign keys (user_id and product_id).
The WHERE clause filters the results to only include rows where the product category is "Electronics".
The GROUP BY clause groups the results by the user's ID, name, and email.
The HAVING clause applies additional conditions on the grouped data. It ensures that the user has made at least 3 orders (COUNT(o.id) >= 3) and has spent more than $1000 on "Electronics" orders (total_spent > 1000).
Finally, the ORDER BY clause sorts the results in descending order based on the total amount spent.
