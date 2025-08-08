@regression @login
Feature: webdriveruniversity login page

    Scenario Outline: login form submission
        Given I navigate to webdriveruniversity homepage
        When I click on the login portal button
        And I switch to the new browser tab
        And I type a Username <userName>
        And I type a Password <password>
        # And I wait for 1 seconds
        And I click on the login submit button
        Then The alert message wil be '<alertMessage>'

        Examples:
            | userName  | password     | alertMessage         |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | webdriver999 | validation failed    |

        @smoke @ignore
        Examples:
            | userName  | password     | alertMessage         |
            | webdriver | webdriver123 | validation succeeded |
