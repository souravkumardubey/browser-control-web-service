const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const { Builder, By } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

let chromeBrowser, firefoxBrowser;

module.exports = {
    startBrowser: async (browser, url) => {
        if (browser === 'chrome') {
            chromeBrowser = await puppeteer.launch({ headless: false });
            const page = await chromeBrowser.newPage();
            await page.goto(url);
        } else if (browser === 'firefox') {
            firefoxBrowser = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().setPreference("browser.cache.disk.enable", false)).build();
            await firefoxBrowser.get(url);
        }
    },
    stopBrowser: async (browser) => {
        if (browser === 'chrome' && chromeBrowser) {
            await chromeBrowser.close();
            chromeBrowser = null;
        } else if (browser === 'firefox' && firefoxBrowser) {
            await firefoxBrowser.quit();
            firefoxBrowser = null;
        }
    },
    getActiveTab: async (browser) => {
        if (browser === 'chrome' && chromeBrowser) {
            const pages = await chromeBrowser.pages();
            const activePage = pages[0];
            return activePage.url();
        } else if (browser === 'firefox' && firefoxBrowser) {
            const activePage = await firefoxBrowser.getCurrentUrl();
            return activePage;
        }
    },
    cleanupBrowser: async (browser) => {
        if (browser === 'chrome') {
            exec('chrome --clear-cache --clear-history');
        } else if (browser === 'firefox') {
            exec('firefox --clear-cache --clear-history');
        }
    }
};
