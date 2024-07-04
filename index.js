const express = require('express');
const browserController = require('./browserController');

const app = express();
const port = 3000;

app.get('/start', async (req, res) => {
    const { browser, url } = req.query;
    try {
        await browserController.startBrowser(browser, url);
        res.status(200).send(`${browser} started with URL: ${url}`);
    } catch (error) {
        res.status(500).send(`Error starting ${browser}: ${error.message}`);
    }
});

app.get('/stop', async (req, res) => {
    const { browser } = req.query;
    try {
        await browserController.stopBrowser(browser);
        res.status(200).send(`${browser} stopped successfully`);
    } catch (error) {
        res.status(500).send(`Error stopping ${browser}: ${error.message}`);
    }
});

app.get('/getUrl', async (req, res) => {
    const { browser } = req.query;
    try {
        const url = await browserController.getActiveTab(browser);
        res.status(200).send(`Current active tab URL for ${browser}: ${url}`);
    } catch (error) {
        res.status(500).send(`Error getting URL for ${browser}: ${error.message}`);
    }
});

app.get('/cleanup', async (req, res) => {
    const { browser } = req.query;
    try {
        await browserController.cleanupBrowser(browser);
        res.status(200).send(`${browser} cleaned up successfully`);
    } catch (error) {
        res.status(500).send(`Error cleaning up ${browser}: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Browser controller service running at http://localhost:${port}`);
});
