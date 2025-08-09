@regression @contactus
Feature:  webdriveruniversity contact us page

    Background: Pre condition
        Given I navigate to webdriveruniversity homepage
        When I click on the contact us button
        And I switch to the new browser tab

    Scenario: Valid contact us form subission
        And I type a first name
        And I type a last name
        And I type an email adress
        And I type a comment
        And I click on the submit button
        Then I should be presented width a successfull contact us submission message

    Scenario: Invalid contact us form subission
        And I type a first name
        And I type a last name
        # And I type an email adress
        And I type a comment
        And I click on the submit button
        Then I should be presented with unsuccesful contact us message

    Scenario: Valid contact us form subission - using Specific Data
        And I type a specific first name "Wietze"
        And I type a specific last name "Duursma"
        And I type an specific email adress "w.duur@gmail.com"
        And I type a specific text "Hellow world"  and a number 2 within the comment input field
        And I click on the submit button
        Then I should be presented width a successfull contact us submission message

    Scenario: Valid contact us form subission - using Random Data
        And I type a random first name
        And I type a random last name
        And I type an random email adress
        # And I type a comment
        And I type a random comment
        And I click on the submit button
        Then I should be presented width a successfull contact us submission message


    Scenario Outline: Validate countact us page
        And I type a first name <firstName> and a last name <lastName>
        And I type a email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented width header text '<message>'

        @smoke
        Examples:
            | firstName | lastName | emailAddress           | comment              | message                     |
            | Jhon      | Doodle   | j.doodle@exampl.com    | tis is a test        | Thank You for your Message! |
            | Sandra    | Rode     | rode_sandra@exampl.com | tis is a from Sandra | Thank You for your Message! |
            | Wietze    | Duursma  | w.duur.gmail.com       | message a test       | Invalid email address       |