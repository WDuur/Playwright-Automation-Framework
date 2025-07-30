Feature:  webdriveruniversity contact us page
    Scenario: Valid contact us form subission
        Given I navigate to webdriveruniversity homepage
        When I click on the contact us button
        And I type a first name
        And I type a last name
        And I type an email adress
        And I type a comment
        And I click on the submit button
        Then I should be presented width a successfull contact us  submission message


