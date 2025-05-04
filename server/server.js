const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" }); // Load environment variables from the specified path

const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: process.env.DB_USER,
  server: process.env.DB_SERVER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbout: true,
  },
  port: parseInt(process.env.DB_PORT, 10), // Use the environment variable directly
};

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

app.get("/dinein", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [dbo].[categories] 
      WHERE name IN ('PIZZA MENU', 'Sides', 'Beverage', 'Group', 'GROUP SLIDER')
      ORDER BY CASE 
          WHEN name = 'PIZZA MENU' THEN 1 
          WHEN name = 'Sides' THEN 2
          WHEN name = 'Beverage' THEN 3
          WHEN name = 'Group' THEN 4
          WHEN name = 'GROUP SLIDER' THEN 5
          ELSE 6 -- Ensures other values are pushed to the end
      END;
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  if (categoryId == 2) {
    condi_query = `category_id = 1 OR category_id = 2`;
  } else {
    condi_query = `category_id = ${categoryId}`;
  }
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT *, REPLACE(name, ' ALA CARTE', '') AS cleaned_name
       FROM [dbo].[products]
       WHERE  ${condi_query} AND status = 1 AND sub_category_name != 'meal';`,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/edrinks/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  if (categoryId == 13 || categoryId == 14) {
    condi_query = `category_id = 12`;
  } else {
    condi_query = `category_id = 2`;
  }
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT 
        mc.id,
        mc.code,
        mc.name,
        mc.short_name,
        mc.bar_code,
        mc.category_id,
        mc.retail_price,
        -- Use ala carte image if available, otherwise fallback to meal's own
        ISNULL(ac.image_url, mc.image_url) AS image_url,
        ISNULL(ac.thumnail_url, mc.thumnail_url) AS thumnail_url,
        mc.status,
        mc.ref_code,
        mc.created_by,
        mc.created_at,
        mc.updated_by,
        mc.updated_at,
        mc.tax_exempt,
        mc.disable_discount,
        mc.price_type,
        mc.wholesale_price,
        mc.wholesale_quantity,
        mc.allow_decimal_quantities,
        mc.allow_sc_pwd,
        mc.unit_product_id,
        mc.unit_id,
        mc.unit_name,
        mc.unit_cost,
        mc.unit_content_quantity,
        mc.color_id,
        mc.size_id,
        mc.product_type,
        mc.sub_category_name,
        mc.is_branch_product,
        mc.valid_from,
        mc.valid_to,
        mc.previous_status,
        mc.alternate_name,
        mc.allow_athlete_mov,
        mc.allow_solo_parent
      FROM [dbo].[products] mc
      LEFT JOIN [dbo].[products] ac
        ON REPLACE(mc.name, ' Meal Component', '') + ' ALA CARTE' = ac.name  -- Add "ALA CARTE" to the name of the meal component for matching
        AND ac.category_id = 1  -- Ensure that this category ID is for ala carte items
      WHERE mc.${condi_query}  -- Meal components
        AND mc.status = 1`,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/TakeOut", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [dbo].[categories] 
      WHERE name IN ('PIZZA MENU', 'Sides', 'Beverage', 'Group', 'GROUP SLIDER')
      ORDER BY CASE 
          WHEN name = 'PIZZA MENU' THEN 1 
          WHEN name = 'Sides' THEN 2
          WHEN name = 'Beverage' THEN 3
          WHEN name = 'Group' THEN 4
          WHEN name = 'GROUP SLIDER' THEN 5
          ELSE 6 -- Ensures other values are pushed to the end
      END;
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.get("/item/:alacarteName", (req, res) => {
  const { alacarteName } = req.params;
  const mealName = alacarteName.replace(/ALA CARTE$/, "MEAL");
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `SELECT * FROM [dbo].[products] 
      WHERE name = '${mealName}' AND code LIKE 'EP%';
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});

app.use("/images", express.static(path.join("C:\\BarterCX")));

app.get("/dinein/orderNumber", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query(
      `
      `,
      (err, result) => {
        if (err) console.log(err);
        res.send(result.recordset);
      }
    );
  });
});
