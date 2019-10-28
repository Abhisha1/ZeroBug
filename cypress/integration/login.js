describe("Testing login", function(){
    it('Test login with invalid email', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("testprofessorcom")
        cy.get("#password").type("Hello123")
        cy.get("[type='submit']").click()
        cy.url().should('eq', "https://zerobug.netlify.com/signin")
    })
    it('Test login with no email', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#password").type("Hello123")
        cy.get("[type='submit']").should('be.disabled')
    })
    it('Test login with wrong email', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("blah@professor.com")
        cy.get("#password").type("Test12345")
        cy.get("[type='submit']").click()
        cy.url().should('eq', "https://zerobug.netlify.com/signin")
    })
    it('Test login with invalid password', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("test@professor.com")
        cy.get("#password").type("dfhhh18267e")
        cy.get("[type='submit']").click()
        cy.url().should('eq', "https://zerobug.netlify.com/signin")
    })
    it('Test login with no password', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("test@professor.com")
        cy.get("[type='submit']").should('be.disabled')
    })
    it('Test login with no a non authorised user', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("jamil@professor.com")
        cy.get("#password").type("dfhhh18267e")
        cy.get("[type='submit']").click()
        cy.get("#errorMessage").should('eq', "There is no user record corresponding to this identifier. The user may have been deleted.")
    })
    it('Test login with no input', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("[type='submit']").should('be.disabled')
    })
    it('Test login with valid details', function() {
        cy.visit("https://zerobug.netlify.com/signin")

        cy.get("#email").type("testaccount@gmail.com")
        cy.get("#password").type("000000")
        cy.get("[type='submit']").click()
        cy.url().should('eq', "https://zerobug.netlify.com/home")
    })
})