# Apple Store Automation Bot

This is a Node.js script using Puppeteer to automate the process of purchasing an iPhone 16 Pro from Apple's online store.

## Features

- Automates the entire purchase process:
  - Selecting phone specifications (size, color, storage)
  - Adding to cart
  - Filling shipping information
  - Processing payment
- Uses Puppeteer with stealth plugin to avoid detection
- Includes error handling and screenshots for debugging
- Implements realistic delays between actions

## Requirements

- Node.js (v14 or higher)
- Google Chrome or Chromium

## Installation

1. Clone this repository or download the script
2. Install dependencies:
   ```bash
   npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth chrome-location
   ```

## Usage

1. Run the script:

   ```bash
   node index.js
   ```

2. The script will:
   - Open a browser window
   - Navigate to the iPhone 16 Pro page
   - Select specifications and add to cart
   - Fill in shipping information
   - Process payment

## Configuration

You can modify these aspects of the script:

- **Product URL**: Change the `url_16` variable to target different products
- **Shipping Information**: Update the `shipping()` function with your details
- **Payment Information**: Update the `payment()` function with your payment details
- **Delays**: Adjust the pause times in `smart_click_with_pause()` to make the bot more/less human-like

## Important Notes

- The script runs in non-headless mode (`headless: false`) so you can see what's happening
- Error screenshots are saved as `error-screenshot.png` if something goes wrong
- The script includes multiple selectors for payment options to handle different page layouts

## Disclaimer

This script is for educational purposes only. Use it responsibly and in compliance with Apple's terms of service. The author is not responsible for any misuse of this script.

## Troubleshooting

If you encounter issues:

1. Check that all dependencies are installed
2. Verify that Chrome is installed and accessible
3. Check the error screenshot (`error-screenshot.png`) for visual clues
4. Look at the console output for specific error messages
