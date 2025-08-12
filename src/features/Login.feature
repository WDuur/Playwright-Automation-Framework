@regression @login
Feature: webdriveruniversity login page

    Scenario Outline: login form submission
        Given I navigate to the login page
        And I type a Username <userName>
        And I type a Password <password>
        # And I wait for 1 seconds
        And I click on the login submit button
        Then The alert message wil be '<alertMessage>'

        Examples:
            | userName  | password     | alertMessage         |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | webdriver999 | validation failed    |

        @smoke
        Examples:
            | userName  | password     | alertMessage         |
            | webdriver | webdriver123 | validation succeeded |
