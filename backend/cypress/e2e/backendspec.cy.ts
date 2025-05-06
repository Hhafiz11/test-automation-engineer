describe('Backend Integration Tests', () => {

  it('Verify if new product can be added after clicking "Create" button', () =>{
    var productName: string
    const productDetails = {
        "name": "Starfruit",
        "description": "A fruit that is good for the health",
        "price": 10
    }
    //Add new product and store its name for validation
    cy.request('POST','http://localhost:3000/products',productDetails)
    .then(response =>{
      expect(response.status).to.equal(201)
      expect(response.body).to.have.property('name')
      productName = response.body.name
      //Validate if new product is displayed upon creation
      cy.request('GET','http://localhost:3000/products').then(response =>{
        const product = response.body.find((p: any) => p.name === productName);
        expect(product).to.exist;
        expect(product.name).to.equal('Starfruit');
      })
    })
  })

  it('Place an order on a selected product', () =>{
    //Store the first product details from the list
    cy.request('GET','http://localhost:3000/products').then(response =>{
      const firstProduct = response.body[0]
      expect(firstProduct).to.have.property('id')
      expect(firstProduct).to.have.property('name')
      expect(firstProduct).to.have.property('price')

      const productID = firstProduct.id
      const productName = firstProduct.name
      const productIPrice = firstProduct.price
      const orderedProduct = {
        "product_id": productID,
        "quantity": 5,
        "product_name": productName,
        "price": productIPrice,
        "created_at": "2025-05-06T04:36:21.664Z",
        "updated_at": "2025-05-06T04:36:21.664Z"
      }
      //Validate the quantity input and quantity displayed in the Orders page
      cy.request('POST','http://localhost:3000/orders',orderedProduct)
      .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('quantity')
        orderedProduct.quantity = response.body.quantity
      })
    })
  })
})