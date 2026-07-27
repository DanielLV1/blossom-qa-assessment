## Introduction:

As part of the selection process for the Middle Automation Engineer position, we’re sharing a hands-on technical test that reflects the type of work you’d perform on a day-to-day basis as part of the team. The goal of this exercise is to evaluate your ability to design and build from scratch a robust, maintainable, and scalable test automation framework, applying quality engineering (QE) best practices. You’ll have some days to complete it, and once we receive your submission, we’ll schedule a live technical interview to review your solution together.


## Objectives

With this test, we aim to evaluate your technical judgment in several key areas: your ability to select and justify the use of tools and languages appropriate to the context (Java, JavaScript/TypeScript, or Python); your ability to apply a clear design pattern (POM, Screenplay, or equivalent) with proper separation of concerns; your handling of test data strategies, parallel execution, environment-specific configuration, and resilience mechanisms (explicit waits, without using `sleep()`); and your critical thinking regarding scalability, preventing flakiness, and technical prioritization as the team and test suite grow.


## Part 1 — Automation Framework

## Scenario

You are joining a team with minimal automation coverage. Build the test automation foundation the team will extend.

## Choose one of the following demo applications:

- https://www.saucedemo.com (e-commerce/login flows) [URL 🔗](https://www.saucedemo.com/)

- [• https://restful-booker.herokuapp.com (REST API)](https://restful-booker.herokuapp.com/)

- https://parabank.parasoft.com (banking demo) [URL 🔗](https://parabank.parasoft.com/)

Accepted languages/frameworks: Java, JavaScript/TypeScript, or Python — your choice.


## Requirements

Build a functional test automation framework from scratch that includes:

- At least 15 automated test cases covering:

- At least 4 UI end-to-end flows

- At least 5 API test cases (REST), including at least 1 chained scenario (create → verify → update → delete)

- At least 3 negative/edge case scenarios

- At least 1 data-driven test (parameterized, multiple data sets)

- A clear design pattern (POM, Screenplay, or equivalent) with proper separation of concerns (tests, page objects/clients, test data, configuration)

- Parallel execution support

- Environment configuration — running against a different base URL must not require code changes

- A test data management strategy (fixtures, factories, or builders — no hardcoded data scattered across tests)

- Explicit waits / resilience strategy — no sleep() calls

- Tagging/grouping (e.g., smoke vs. regression) with the ability to run subsets

- README.md with:

- How to install and run the suite locally (including subsets and parallel runs)

- Framework structure explanation

- Tool/language justification

- CI configuration (GitHub Actions, Jenkins pipeline, or similar) that runs the suite on push and publishes the report

- Test execution report (Allure, Serenity, or equivalent) with failure screenshots for UI tests


## Part 2 — Technical Design Notes

Include a 1-page technical note (Markdown, in the same repo) covering:

- 1. Key design decisions — the 3 most important architectural choices you made and the trade-offs behind them

- 2. Flakiness prevention — what specific mechanisms in your framework prevent flaky tests?

- 3. Scaling — if 3 more engineers joined tomorrow and the suite grew to 500 tests, what would you change first?

- 4. What you'd do differently — with 2 more weeks, what would you add or refactor?

Keep it short and direct — we value clarity of technical reasoning over document length.

## Submission

- Share the GitHub repository link when ready

- Make sure the README allows us to run the suite locally without contacting you

- Commit your work incrementally as you would on a real project

If you have questions about the assessment, feel free to reach out. Good luck!


## Deliverables:

The candidate is expected to submit a GitHub repository (public or shared) that includes: a functional automation framework with at least 15 test cases (covering end-to-end UI flows, API tests with at least one chained scenario: create → verify → update → delete, negative/edge cases, and at least one data-driven test); a CI setup (GitHub Actions, Jenkins, or similar) that runs the suite on every push and publishes the results report (Allure, Serenity, or equivalent, with screenshots of UI failures); a clear README.md file with instructions for installation, local execution (including subsets and parallel execution), and an explanation of the framework’s structure; and finally, a one-page technical note (in Markdown, within the same repository) explaining the most important design decisions, the strategy for preventing flakiness, how the suite would scale as the team grows, and what you would do differently if you had more time.


# Thank you and good luck

[www.blossom.net](http://www.blossom.net)
