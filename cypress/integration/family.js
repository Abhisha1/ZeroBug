describe("Testing create a family", function(){
    it("Create a valid family", function(){
        cy.visit("https://zerobug.netlify.com/create-family")

        cy.get("[name='familyName']").type("Abhisha's Testers")
        cy.get("#add-user-button").click()
        cy.get("#find-user-button").click()
        cy.wait(10000)
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().next().children("button").click()
        cy.get('button.close').click()
        cy.get("#create-family-button").click()

    })
    it("Create an existing family", function(){
        cy.visit("https://zerobug.netlify.com/create-family")

        cy.get("[name='familyName']").type("Abhisha's Testers")
        cy.get("#add-user-button").click()
        cy.get("#find-user-button").click()
        cy.wait(10000)
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().next().children("button").click()
        cy.get('button.close').click()
        cy.get("#create-family-button").click()
        cy.get("div.modal-header")
    })
    it("Create a family without family name", function(){
        cy.visit("https://zerobug.netlify.com/create-family")
        cy.get("#add-user-button").click()
        cy.get("#find-user-button").click()
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().next().children("button").click()
        cy.get('button.close').click()
        cy.get("#create-family-button").should('be.disabled')
    })
    it("Create a family without users", function(){
        cy.visit("https://zerobug.netlify.com/create-family")
        cy.get("[name='familyName']").type("Abhisha's Testers")
        cy.get("#create-family-button").should('be.disabled')
    })
    it("Create a family with one family member", function(){
        cy.visit("https://zerobug.netlify.com/create-family")
        cy.get("[name='familyName']").type("Abhishas Testers")
        cy.get("#add-user-button").click()
        cy.get("#find-user-button").click()
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().next().children("button").click()
        cy.get('button.close').click()
        cy.get("#create-family-button").click()
    })
    it("Create a family trying to add same user multiple times", function(){
        cy.visit("https://zerobug.netlify.com/create-family")
        cy.get("[name='familyName']").type("Abhishas Testeers")
        cy.get("#add-user-button").click()
        cy.get("#find-user-button").click()
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().children("button").click()
        cy.get("#searchResults").children().first().children("button").click()
        cy.get('button.close').click()
        cy.get("#create-family-button").click()
    })
})
describe("View a family", function(){
    it("View a family you have access too", function(){
        cy.visit("https://zerobug.netlify.com/family/Abhisha's Testers")

        cy.get("#familyName").should('be', "Abhisha's Testers")

    })
})