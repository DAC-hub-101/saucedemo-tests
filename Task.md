# Automation Task with Playwright / Задача за автоматизация с Playwright

## Task Description / Описание на задачата

### Website for Automation / Сайт за автоматизация

Use the website https://www.saucedemo.com/ for the following scenarios.

### Test Scenarios / Тестови сценарии

#### Scenario 1: Login with Valid Credentials / Вход с валидни данни

* Enter correct username and password (using standard test credentials provided by the site)
* Confirm successful user login
* Verify user is on correct page (by checking specific elements, URL, or page title)

#### Scenario 2: Login with Invalid Credentials / Вход с невалидни данни

* Enter incorrect username and/or password
* Confirm system displays error message and prevents login

#### Scenario 3: Login with Empty Fields / Вход с празни полета

* Leave both username and password fields empty
* Confirm system displays appropriate error message

### Expected Results / Очаквани резултати

* Verify system responds correctly for each scenario according to specified criteria
* Ensure successful login redirects to correct page

### Additional Guidelines / Допълнителни указания

1. Verify presence of basic login page elements (input fields, login button, etc.)
2. Ensure URL, title, or specific element validation for correct page after login
3. Tests should be repeatable without issues (ensure session/cache clearing)
4. Use Playwright as automation tool

## Original Task in Bulgarian / Оригинална задача на български

Задача за автоматизация с Playwright
Описание на задачата:

1. Сайт за автоматизация:
   Използвай сайта https://www.saucedemo.com/ за следващите сценарии.
2. Задача:
   Автоматизирай тестването на логин страницата, като обхванеш следните сценарии:

Сценарий 1: Вход с валидни данни

* Въведи коректно потребителско име и парола (например стандартните данни,
  които сайтът предоставя за тестване).
* Потвърди, че потребителят успешно се логва в системата.
* Верифицирай, че след успешния вход потребителят се намира на правилната
  страница (например, като провериш наличието на определен елемент, URL адреса
  или заглавието на страницата).
  Сценарий 2: Вход с невалидни данни
* Въведи грешно потребителско име и/или парола.
* Потвърди, че системата извежда съобщение за грешка и не допуска вход.
  Сценарий 3: Вход с празни полета
* Остави и полето за потребителско име, и полето за парола празни.
* Потвърди, че системата извежда подходящо съобщение за грешка.
  Очаквани резултати:
* За всеки от горните сценарии провери дали системата реагира коректно, съгласно
  описаните критерии.
* Увери се, че след успешен вход потребителят се намира на правилната страница.
  Допълнителни указания:
* Направи проверка за наличието на основни елементи на логин страницата (полета
  за въвеждане, бутон за вход и т.н.).
* Осигури проверка на URL адреса, заглавието или наличието на специфичен елемент,
  за да валидираш правилната страница след вход.
* Увери се, че тестовете могат да се изпълняват повторно без проблеми (осигури
  изчистване на сесия или кеш).
* Използвай Playwright като автоматизационен инструмент.

## Implementation Notes / Бележки за имплементация

* Task implemented using Playwright Test framework
* See `tests/login.spec.ts` for test implementations
* Tests can be run using `npx playwright test`
