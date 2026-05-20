# Playwright Automation Learning Journey 🚀

This repository contains my practical laboratory, notes, and technical evolution during the advanced **Playwright JS/TS Automation Testing from Scratch & Framework** course.

The main goal of this project is to solidify the foundations of Playwright for its subsequent application in corporate frameworks, adopting modern methodologies and scalable architectures.

---

## 🛠️ Tech Stack & Environment
* **OS:** Windows Subsystem for Linux (WSL2 - Ubuntu)
* **Runtime:** Node.js
* **Automation Framework:** Playwright
* **Language:** JavaScript/Typescript

## 🛠️ Development Environment & Technical Challenges

One of the greatest value-adds during the initialization phase of this project has been the environment configuration, executed on **Windows Subsystem for Linux 2 (WSL2)** using a cutting-edge distribution: **Ubuntu 24.04 / 26.04 LTS**.

Working in such an updated Linux environment required manually resolving native incompatibilities within the multimedia core of the browsers managed by Playwright, overcoming the following technical challenges before launching the first test:
1. **Host Validation:** Bypassing strict Playwright binary restrictions by temporarily emulating stable versions in `/etc/os-release`.
2. **Multimedia & Audio Incompatibilities:** Manually resolving critical dependencies of the graphics and sound systems (`libnspr4`, `libnss3`).
3. **Package Evolution in Linux (t64):** Managing and installing modern architecture compatibility libraries (`libasound2t64`) and restructuring symbolic links (`ln -s`) to fix broken library paths within the **Chromium** engine.

---

## 📁 Project Structure

To keep the repository clean, scalable, and easy to understand for any code reviewer or recruiter, the tests are structured modularly within the native `tests` directory.

Playwright recursively scans subfolders, allowing the learning process to be segmented into sections without breaking the main execution path (`playwright.config.js`):

```text
PlayWrightAutomation/
├── config/                  # Framework configurations
├── tests/                   # Root test directory (scanned by Playwright)
│   ├── 01-core_concepts/    # Browser initialization and essential web flows
│   │   └── UIBasicstest.spec.js
│   ├── 02-basic_methods/    # Core locators, interactions, and fundamental assertions
│   └── 03-advanced/         # (Upcoming) Complex interactions, API testing, and optimization
├── package.json
└── README.md                # Project documentation
```
---

## 🚀 Getting Started & Execution

To clone and run this project locally, ensure you have **Node.js** installed on your system. Follow these steps to set up your environment and execute the test suites:

### 1. Installation
First, install the project dependencies specified in the `package.json` file:
```bash
npm install
```
### 2. Execution
Secondly, execute the tests depending of the folder to test :
```bash
npx playwright test tests/<your-test-folder>/
```
Or indicating the script .js directly with the relative path
```bash
npx playwright test tests/<your-test-folder>/script.js
```
