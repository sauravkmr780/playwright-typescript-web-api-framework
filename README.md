# 🚀 Enterprise Playwright TypeScript Hybrid Test Automation Framework

An end-to-end Web UI and API automation framework built with **Playwright**, **TypeScript**, **Page Object Model (POM)**, featuring **Visual Regression**, **Accessibility (a11y) Testing**, **Full UI/Keyboard Actions**, **Allure Reporting**,**OAuth2.0 Authentication**, **Network Mocking and Interception**

---

## 🌟 Key Features & Capabilities

### 🌐 Web UI Automation
* **Page Object Model (POM):** Clean separation of page locators, actions, and test assertions.
* **Full UI Actions:** Handling of dropdowns, alerts/dialogs, iframes, multi-window/tabs, file uploads/downloads, drag-and-drop, and mouse hovers.
* **Keyboard & Mouse Emulation:** Low-level keystroke interactions, shortcuts, modifier keys, press sequences, and mouse coordinates.
* **Visual Regression Testing:** Pixel-perfect snapshot comparison (`toHaveScreenshot()`, `toMatchSnapshot()`).
* **Accessibility (a11y) Testing:** WCAG standard compliance scanning using `@axe-core/playwright`.

### 🔌 API Automation & Contract Validation
* **Full CRUD Operations:** Automated `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests using Playwright `APIRequestContext`.
* **Authentication Mechanisms:** Preemptive Basic Auth, Bearer (OAuth2/JWT) Tokens, API Key query/header authentication, and Cookie sessions.
* **Schema Validation & Contract Testing:** JSON schema validation powered by **AJV**.
* **Dynamic Test Data:** Synthetic data generation using `@faker-js/faker` and date calculations via `Luxon`.

### 📊 Reporting & Observability
* **Interactive Allure Reports:** Step-by-step test execution, failure screenshots, video recordings, and historical pass/fail trends.
* **Playwright HTML Report & Trace Viewer:** Full DOM execution replay, network inspection, and console logs.
