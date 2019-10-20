describe("Testing login", function(){
    it('Test login with valid details', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("test@professor.com")
        cy.get("#formPassword").type("Test12345")
        cy.get("[value='Sign In']").click()
        cy.url().should('eq', "https://zero-bug.herokuapp.com/home")
    })
    it('Test login with invalid email', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("testprofessorcom")
        cy.get("#formPassword").type("Hello123")
        cy.get("[value='Sign In']").click()
        cy.url().should('eq', "https://zero-bug.herokuapp.com/signin")
    })
    it('Test login with no email', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formPassword").type("Hello123")
        cy.get("[value='Sign In']").should('be.disabled')
    })
    it('Test login with wrong email', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("blah@professor.com")
        cy.get("#formPassword").type("Test12345")
        cy.get("[value='Sign In']").click()
        cy.url().should('eq', "https://zero-bug.herokuapp.com/signin")
    })
    it('Test login with invalid password', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("test@professor.com")
        cy.get("#formPassword").type("dfhhh18267e")
        cy.get("[value='Sign In']").click()
        cy.url().should('eq', "https://zero-bug.herokuapp.com/signin")
    })
    it('Test login with no password', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("test@professor.com")
        cy.get("[value='Sign In']").should('be.disabled')
    })
    it('Test login with no a non authorised user', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("#formEmail").type("jamil@professor.com")
        cy.get("#formPassword").type("dfhhh18267e")
        cy.get("[value='Sign In']").click()
        cy.get("#errorMessage").should('eq', "There is no user record corresponding to this identifier. The user may have been deleted.")
    })
    it('Test login with no input', function() {
        cy.visit("https://zero-bug.herokuapp.com/signin")

        cy.get("[value='Sign In']").should('be.disabled')
    })
})