"""
pip install selenium
python tests/run.py
(needs: npm run dev running)
"""

import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

BASE = "http://localhost:5173"

# ── browser setup ─────────────────────────────────────────────────────────────

options = Options()
options.binary_location = "/usr/sbin/chromium"
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)
driver.maximize_window()
driver.implicitly_wait(5)

# ── helpers ───────────────────────────────────────────────────────────────────


def go(path):
    driver.get(f"{BASE}{path}")
    time.sleep(1)


def click(xpath):
    driver.find_element(By.XPATH, xpath).click()
    time.sleep(0.7)


def type_into(id, text):
    el = driver.find_element(By.ID, id)
    el.clear()
    time.sleep(0.3)
    el.send_keys(text)
    time.sleep(0.4)


def wait_for(xpath, timeout=5):
    deadline = time.time() + timeout
    while time.time() < deadline:
        els = driver.find_elements(By.XPATH, xpath)
        if els:
            return els[0]
        time.sleep(0.2)
    return None


# ── array input ───────────────────────────────────────────────────────────────

print("--- Array input ---")

print("Empty array...")
go("/algorithms")
click("//button[normalize-space()='Sorting']")
driver.find_element(By.ID, "custom-array").clear()
time.sleep(0.5)
click("//button[normalize-space()='Apply']")
wait_for("//*[contains(text(),'cannot be empty')]")
time.sleep(1)

print("Invalid values...")
go("/algorithms")
click("//button[normalize-space()='Sorting']")
type_into("custom-array", "abc, 999, -1")
click("//button[normalize-space()='Apply']")
wait_for("//*[contains(text(),'integers between 1 and 99')]")
time.sleep(1)

print("Too many elements...")
go("/algorithms")
click("//button[normalize-space()='Sorting']")
type_into("custom-array", ",".join(str(i) for i in range(1, 25)))
click("//button[normalize-space()='Apply']")
wait_for("//*[contains(text(),'Maximum 20')]")
time.sleep(1)

print("Valid array...")
go("/algorithms")
click("//button[normalize-space()='Sorting']")
type_into("custom-array", "5, 3, 8, 1, 9")
click("//button[normalize-space()='Apply']")
wait_for("//*[contains(text(),'Array applied')]")
time.sleep(1)

# ── target input ──────────────────────────────────────────────────────────────

print("\n--- Target input ---")

print("Non-numeric target...")
go("/algorithms")
click("//button[normalize-space()='Searching']")
type_into("search-target", "abc")
click("//button[normalize-space()='Set']")
wait_for("//*[contains(text(),'whole number')]")
time.sleep(1)

print("Out of range target...")
go("/algorithms")
click("//button[normalize-space()='Searching']")
type_into("search-target", "200")
click("//button[normalize-space()='Set']")
wait_for("//*[contains(text(),'between 1 and 99')]")
time.sleep(1)

print("Target not in array...")
go("/algorithms")
click("//button[normalize-space()='Searching']")
type_into("custom-array", "1, 2, 3, 4, 5")
click("//button[normalize-space()='Apply']")
type_into("search-target", "99")
click("//button[normalize-space()='Set']")
wait_for("//*[contains(text(),'not in the current array')]")
time.sleep(1)

print("Valid target...")
go("/algorithms")
click("//button[normalize-space()='Searching']")
type_into("custom-array", "10, 20, 30, 40, 50")
click("//button[normalize-space()='Apply']")
type_into("search-target", "30")
click("//button[normalize-space()='Set']")
wait_for("//*[contains(text(),'Target set to 30')]")
time.sleep(1)

# ── quiz ──────────────────────────────────────────────────────────────────────

print("\n--- Quiz ---")

print("Empty form...")
go("/quiz")
click("//button[contains(text(),'Start Quiz')]")
wait_for("//*[contains(text(),'2')]")
time.sleep(1)

print("Short student ID...")
go("/quiz")
type_into("q-name", "Omar Attia")
type_into("q-id", "ab")
click("//button[contains(text(),'Start Quiz')]")
wait_for("//*[contains(text(),'4')]")
time.sleep(1)

print("Valid registration...")
go("/quiz")
type_into("q-name", "Omar Attia")
type_into("q-id", "S00122")
click("//button[contains(text(),'Start Quiz')]")
wait_for("//*[contains(text(),'Question 1')]")
time.sleep(1)

print("Next without answer...")
click("//button[contains(text(),'Next')]")
wait_for("//*[contains(text(),'select an answer')]")
time.sleep(1)

print("Completing the quiz...")
for i in range(10):
    wait_for("//*[contains(text(),'Question')]")
    options = driver.find_elements(
        By.XPATH, "//button[contains(@class,'border-gray-700')]"
    )
    if not options:
        options = driver.find_elements(
            By.XPATH, "//button[contains(@class,'rounded-xl border-2')]"
        )
    options[0].click()
    time.sleep(0.6)
    driver.find_element(
        By.XPATH, "//button[contains(text(),'Next') or contains(text(),'Submit')]"
    ).click()
    time.sleep(0.6)

wait_for("//*[contains(text(),'/10')]")
print("Results screen reached.")
time.sleep(2)

# ── done ──────────────────────────────────────────────────────────────────────

print("\nDone.")
driver.quit()
