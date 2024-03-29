const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products including associated Category and Tag data
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'tags'
      }
    ]
  })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id` including associated Category and Tag data
  Product.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
        as: 'tags'
      }
    ]
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        // Call bulkCreate for ProductTag model to create tag associations
        return ProductTag.bulkCreate(productTagIdArr)
          .then(() => {
            // Respond with product and associated tag ids
            res.status(200).json({ product, message: 'Product created successfully' });
          });
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // Update product tags if tagIds are provided
    .then(() => {
      // Find existing product tags
      return ProductTag.findAll({
        where: { product_id: req.params.id }
      });
    })
    .then((productTags) => {
      // Get tag ids associated with the product
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      
      // Find product tags to be removed
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      
      // Perform bulk operations for adding new tags and removing old tags
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then(() => {
      // Respond with updated product data
      res.status(200).json({ message: 'Product updated successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete one product by its `id` value
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
