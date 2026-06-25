# RAMS Web Application Test Plan

## Application Overview

Explore the RAMS web application at https://dev.marichi.app and create a structured test plan covering authentication, core modules, and key validation scenarios.

## Test Scenarios

### 1. Authentication and Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login page rendering and basic validation

**File:** `tests/auth/login-page.spec.ts`

**Steps:**
  1. Open the RAMS login page at https://dev.marichi.app/login
    - expect: The login page loads successfully and displays the sign-in form.
  2. Verify the username and password inputs, forgot password link, and sign-in button are present
    - expect: All primary authentication controls are visible and enabled.
  3. Attempt login with an empty form and submit
    - expect: The application shows a validation error or prevents submission.
  4. Attempt login with invalid credentials
    - expect: The system rejects the login and displays an appropriate error message.

#### 1.2. Successful authentication flow

**File:** `tests/auth/successful-login.spec.ts`

**Steps:**
  1. Enter valid credentials and submit the sign-in form
    - expect: The application proceeds to the next authentication step, such as OTP verification, if required.
  2. Complete the OTP challenge if prompted
    - expect: The user is successfully authenticated and lands on the main application area.

### 2. Core Operational Modules

**Seed:** `tests/seed.spec.ts`

#### 2.1. Receiving log entry workflow

**File:** `tests/operations/receiving-log.spec.ts`

**Steps:**
  1. Navigate to the receiving log module from the application menu
    - expect: The receiving log page opens without errors.
  2. Create a new receiving entry with valid data
    - expect: The entry is created and saved successfully.
  3. Validate required field handling and error messages
    - expect: Missing or invalid values trigger clear validation feedback.

#### 2.2. Tracking workflow

**File:** `tests/operations/tracking.spec.ts`

**Steps:**
  1. Open the tracking module
    - expect: The tracking screen loads correctly and shows the available tracking actions.
  2. Create or update a tracking record using valid values
    - expect: The record is processed and reflected in the UI.
  3. Verify error handling for invalid input
    - expect: The system blocks invalid submission and displays helpful validation messages.

#### 2.3. Waste management workflow

**File:** `tests/operations/waste-management.spec.ts`

**Steps:**
  1. Open the waste management module
    - expect: The waste management interface loads successfully.
  2. Create a waste record and perform a move or status change action
    - expect: The action completes and the updated state is visible in the UI.
  3. Check for confirmation or warning prompts where applicable
    - expect: The application prompts for confirmation or provides appropriate feedback.

### 3. Navigation and Usability

**Seed:** `tests/seed.spec.ts`

#### 3.1. Main navigation and module access

**File:** `tests/ui/navigation.spec.ts`

**Steps:**
  1. Inspect the main navigation menu after login
    - expect: The main modules are accessible and labeled clearly.
  2. Navigate between modules and return to the dashboard or home screen
    - expect: Navigation is consistent and does not break the session.
  3. Verify session persistence during navigation
    - expect: The user remains authenticated while moving between pages.

#### 3.2. Responsive and accessibility basics

**File:** `tests/ui/responsive-accessibility.spec.ts`

**Steps:**
  1. Resize the browser to a smaller viewport
    - expect: Core controls remain usable and are not clipped or inaccessible.
  2. Check that primary controls have meaningful labels and keyboard focus behavior
    - expect: The interface remains navigable with standard keyboard interaction.
