const puppeteer = require("puppeteer")

let test = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
    timeout: 10000,
  });
  const page = await browser.newPage();

  await page.goto('https://amazon.com/dp/B09YRR2LS5');


  const subscribeDiv = '#buyBoxAccordion'
  const subscribe = await page.$(subscribeDiv)


  // const subscribeDiv = '#buyBoxAccordion'
  const oneTime = '#newAccordionRow > div > div.a-accordion-row-a11y.a-accordion-row.a-declarative.accordion-header.mobb-header-css > i'
  const addToCartBtn = '#add-to-cart-button'
  const goToCartBtn = '#sw-gtc'
  const qtyBtn = '#quantity'
  const qtyTen = '#quantity_10'
  const qtyInput = 'input[name="quantityBox"]'
  const updateMsgContent = 'div.sc-quantity-update-message.a-spacing-top-mini > div > div > div > span'

  if (subscribe) {
    console.log('Subs var')
    await page.click('#newAccordionRow > div > div.a-accordion-row-a11y.a-accordion-row.a-declarative.accordion-header.mobb-header-css > i')
  } else {
    console.log('YOK')
    await page.waitForSelector(addToCartBtn)
    await page.click(addToCartBtn, { delay: 2000 })
    await page.waitForSelector(goToCartBtn)
    await page.click(goToCartBtn)
    await page.waitForSelector(qtyBtn)
    await page.click(qtyBtn)
    await page.waitForSelector(qtyTen)
    await page.click(qtyTen)
    await page.waitForSelector(qtyInput)
    await page.type(qtyInput, '999')
    await page.keyboard.press('Enter')

    await page.waitForSelector(updateMsgContent)
    const noAvailable = await page.$(updateMsgContent)
    console.log(noAvailable)


  }




  // Type into search box.
  // await page.type('.devsite-search-field', 'Headless Chrome');

  // Wait for suggest overlay to appear and click "show all results".
  // const allResultsSelector = '#nav-global-location-popover-link';
  // await page.waitForSelector(allResultsSelector);
  // await page.click(allResultsSelector);
  // //
  // //GLUXZipUpdateInput

  // // Wait for the results page to load and display the results.
  // // const resultsSelector = '.gsc-results .gs-title';
  // // await page.waitForSelector(resultsSelector);
  // await page.waitForSelector("#GLUXZipUpdateInput");
  // // // Extract the results from the page.
  // const links = await page.evaluate(async () => {

  //   let inputBox = document.getElementById("GLUXZipUpdateInput")
  //   inputBox.value = "10001"

  //   //aria-labelledby="GLUXZipUpdate-announce"
  //   // let apply = document.querySelectorAll('[aria-labelledby="GLUXZipUpdate-announce"]')[0];
  //   setTimeout(async () => {
  //     document.querySelector('[data-action="GLUXPostalUpdateAction"]').click()


  //     console.log(document.querySelector('[data-action="GLUXConfirmAction"]'))
  //     setTimeout(() => {
  //       document.querySelector('[data-action="GLUXConfirmAction"]').click()
  //     }, 3000);
  //   }, 4000);
  // });
  // await page.waitForNavigation()
  // let country = await page.evaluate(async () => {

  //   return document.getElementById("glow-ingress-line2").innerText
  // });
  // console.log(country)
  // // Print all the files.
  // console.log(links.join('\n'));

  // await browser.close();
};
test()