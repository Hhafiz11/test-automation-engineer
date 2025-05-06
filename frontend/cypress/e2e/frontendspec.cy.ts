describe('E2E Tests', () => {
  
  beforeEach(() => {
    cy.visit('/')
    cy.get('.navbar-nav').contains('Products').click()
  })

  it('Add new product after clicking "Create" button', () =>{
    //Search for "Create" button
    cy.get('a').contains('Create').click()
    //Fill up the product details
    cy.get('form').then (form => {
      cy.wrap(form).find('#product-name').type('Avocado')
      cy.wrap(form).find('#product-description').type('Healthy and sweet Avocado')
      cy.wrap(form).find('#product-price').type('5')
      cy.wrap(form).submit()
    })
    //Validate Products page contains 'Avocado'
    cy.get('.flex-wrap').should('contain','Avocado')
  })

  it('Add order to a selected product after clicking "Order" button', () =>{
    //Specifically look for Avocado's "Order" button
    cy.contains('Avocado').parent().then(selectedProduct =>{
      cy.wrap(selectedProduct).contains('Order').click()
    })
    //Input order quantity
    cy.get('form').then (form => {
      cy.wrap(form).find('#product-quantity').type('7')
      cy.wrap(form).submit()
    })
    //Validate quantity displayed matches with quantity entered
    cy.get('tbody').contains('tr','Avocado').then(orderedProduct =>{
      cy.wrap(orderedProduct).find('td').eq(4).should('contain','7')
    })
  })
})