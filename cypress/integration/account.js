describe("Testing firebase", function(){
    it("Testing the number of family user manage ", function(){
        cy.visit("https://zerobug.netlify.com/signin")
        cy.get("#email").type("chencl0214@gmail.com")
        cy.get("#password").type("000000")
        cy.get("[type='submit']").click()
        cy.wait(10000)
        cy.visit("https://zerobug.netlify.com/account")
        cy.get("#artifactItems").children().first().children().first().children().first().children().should('have.length', 2)
        cy.get("#signOut").click()
    })

    it("Testing the number of the artifact user manage ", function(){
        cy.visit("https://zerobug.netlify.com/signin")
        cy.get("#email").type("chencl0214@gmail.com")
        cy.get("#password").type("000000")
        cy.get("[type='submit']").click()
        cy.wait(10000)
        cy.visit("https://zerobug.netlify.com/account")
        cy.get(".artifactContainer").children().should('have.length', 2)
        cy.get("#signOut").click()
    })

    it('Test changing password', function() {
        cy.visit("https://zerobug.netlify.com/signin")
        cy.get("#email").type("testaccount@gmail.com")
        cy.get("#password").type("111111")
        cy.get("[type='submit']").click()
        cy.wait(10000)
        cy.visit("https://zerobug.netlify.com/account")
        cy.get("[type='password']").type("000000")
        cy.get("#change_password").click()
        cy.wait(10000)
        cy.get("#signOut").click()
        cy.wait(10000)
        cy.get("#email").type("testaccount@gmail.com")
        cy.get("#password").type("000000")
        cy.get("[type='submit']").click()
        cy.get("#homeHeading").invoke("text").should("eq", "My Home")
        cy.get("#signOut").click()
    })

})