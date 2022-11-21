const puppeteer = require("puppeteer")

let test = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://amazon.com');

  // Type into search box.
  // await page.type('.devsite-search-field', 'Headless Chrome');

  // Wait for suggest overlay to appear and click "show all results".
  const allResultsSelector = '#nav-global-location-popover-link';
  await page.waitForSelector(allResultsSelector);
  await page.click(allResultsSelector);
  //
  //GLUXZipUpdateInput

  // Wait for the results page to load and display the results.
  // const resultsSelector = '.gsc-results .gs-title';
  // await page.waitForSelector(resultsSelector);
  await page.waitForSelector("#GLUXZipUpdateInput");
  // // Extract the results from the page.
  const links = await page.evaluate(async () => {

    let inputBox = document.getElementById("GLUXZipUpdateInput")
    inputBox.value = "10001"

    //aria-labelledby="GLUXZipUpdate-announce"
    // let apply = document.querySelectorAll('[aria-labelledby="GLUXZipUpdate-announce"]')[0];
    setTimeout(async () => {
      document.querySelector('[data-action="GLUXPostalUpdateAction"]').click()


      console.log(document.querySelector('[data-action="GLUXConfirmAction"]'))
      setTimeout(() => {
        document.querySelector('[data-action="GLUXConfirmAction"]').click()
      }, 3000);
    }, 4000);
  });
  await page.waitForNavigation()
  let country = await page.evaluate(async () => {

    return document.getElementById("glow-ingress-line2").innerText
  });
  console.log(country)
  // // Print all the files.
  // console.log(links.join('\n'));

  // await browser.close();
};
test()