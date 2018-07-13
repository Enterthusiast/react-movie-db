context('Actions', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('is on page one after title clicked', () => {
        cy.get('.App-title').click()
        cy.get('.App-pagination-page:first')
            .should('have.class', 'active')
            .should('have.text', '1')
    })

    it('open a popin after more info button click', () => {
        cy.get('.App-more-button:first').click()
        cy.get('.modal.open')
            .should('be.visible')
    })

    it('close a popin after close button click', () => {
        cy.get('.App-more-button:first').click()
        cy.get('.modal.open .modal-close').click()
        cy.get('.modal')
            .should('not.be.visible')
    })

    it('scroll to see the las entry', () => {
        cy.get('.App-more-button:last')
            .should('not.be.visible')
        cy.get('.App-more-button:last').scrollIntoView()
            .should('be.visible')
    })
})