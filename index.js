const puppeteer = require("puppeteer-extra");
// Add stealth plugin to avoid detection
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const locateChrome = require("chrome-location");
const { executablePath } = require("puppeteer");

const url_16 = "https://www.apple.com/shop/buy-iphone/iphone-16-pro";

// Add this helper function at the top level
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function givePage() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: locateChrome,
  });
  let page = await browser.newPage();

  return page;
}

async function run() {
  let page = await givePage();
  await page.goto(url_16);
  await add_to_cart(page);
  await shipping(page);
  await payment(page);
}
// Add delays so bot can feel real
async function add_to_cart(page) {
  try {
    await smart_click_with_pause(
      page,
      "input[data-autom='dimensionScreensize6_3inch']",
      2000
    );

    // Color
    await smart_click_with_pause(page, "input[value='deserttitanium']", 2000);

    // Storage
    await smart_click_with_pause(
      page,
      "input[data-autom='dimensionCapacity256gb']",
      2000
    );

    // Trade-in - Fixed selector by adding #
    await smart_click_with_pause(page, "#noTradeIn_label", 2000);

    // Payment option - try multiple possible selectors
    const paymentSelectors = [
      '[data-autom="purchasedGroupOptionfullprice_price"]',
      'input[value="fullprice"]',
      '[data-autom="purchaseOption-fullprice"]',
    ];

    for (const selector of paymentSelectors) {
      try {
        await smart_click_with_pause(page, selector, 2000);
        break; // If successful, exit the loop
      } catch (error) {
        console.log(`Selector ${selector} not found, trying next...`);
      }
    }

    // Carrier
    await smart_click_with_pause(
      page,
      ".form-selector-title.rf-bfe-dimension-simfree",
      2000
    );

    // AppleCare
    await smart_click_with_pause(
      page,
      "#applecareplus_59_noapplecare_label",
      2000
    );

    // Add to cart
    await smart_click_with_pause(
      page,
      '[data-autom="add-to-cart-button"]',
      2000
    );
  } catch (error) {
    console.error("Error in add_to_cart:", error);
    await page.screenshot({ path: "error-screenshot.png" });
    throw error;
  }
}

async function shipping(page) {
  await smart_click_with_pause(page, "button[name='proceed']", 0);
  await smart_click_with_pause(
    page,
    "[id='shoppingCart.actions.navCheckout']",
    0
  );
  await smart_click_with_pause(page, "[id='signIn.guestLogin.guestLogin']", 0);
  await smart_click_with_pause(
    page,
    "id='rs-checkout-continue-button-button'",
    0
  );

  selector =
    "input[id='checkout.shipping.addressSelector.newAddress.address.firstName']";
  await page.waitForSelector(selector);
  await page.type(selector, Larry);

  await page.type("input[name='lastname']", Arrington);
  await page.type("input[name='street']", "2565 New York Avenue");

  //Zip code handling
  const input = await page.$("input[name='postalCode']");
  await input.click({ clickCount: 3 });
  await input.type("11208");

  await page.type("input[name='emailAddress']", "Devwanderers@gmail.com");
  await new Promise((r) => setTimeout(r, 1000));
  await page.type("input[name='fullDaytimePhone']", "646-234-5678");
  await new Promise((r) => setTimeout(r, 1000));
  await page.click("#rs-checkout-continue-button-button");
}

async function payment(page) {
  await smart_click_with_pause(
    page,
    "input[name='checkout.billing.billingOptions.selectBillingOption']",
    0
  );

  //4929222726640311 2/2029, 940
  selector =
    "input[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.cardNumber']";
  await page.waitForSelector(selector);
  await page.type(selector, "4929222726640311");

  await page.type(
    "[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.expiration']",
    "2/29"
  );
  await page.type(
    "[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.securityCode']",
    "940"
  );

  await page.click("button[id='rs-checkout-continue-button-button']");

  await smart_click_with_pause(
    page,
    "button[id='rs-checkout-continue-button-button']",
    0
  );
}

//helper functions
async function smart_click_with_pause(page, selector, pause = 2000) {
  try {
    await page.waitForSelector(selector, {
      timeout: 30000,
      visible: true,
    });

    const element = await page.$(selector);
    if (!element) {
      throw new Error(`Element ${selector} not found`);
    }

    await element.evaluate((el) => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    });

    await delay(500); // Changed from waitForTimeout
    await element.click();
    await delay(pause); // Changed from waitForTimeout
  } catch (error) {
    console.error(`Failed to click selector: ${selector}`);
    console.error(error);
    throw error;
  }
}

run();
