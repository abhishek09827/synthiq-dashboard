import { chromium } from 'playwright';
import fs from 'fs';

async function scrapeWebsiteDetails(url) {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the main URL
        await page.goto(url, { waitUntil: 'load' });

        console.log(`Scraping information from: ${url}`);

        // Wait for the page to load content
        await page.waitForSelector('body');

        // Extract primary details from the homepage
        const homepageContent = await page.evaluate(() => {
            const data = {};

            // Extract main headings (h1, h2)
            const headings = Array.from(document.querySelectorAll('h1, h2'))
                .map((el) => el.textContent?.trim())
                .filter((text) => text && text.length > 0);

            // Extract main paragraphs
            const paragraphs = Array.from(document.querySelectorAll('p'))
                .map((el) => el.textContent?.trim())
                .filter((text) => text && text.length > 0);

            data['headings'] = headings;
            data['paragraphs'] = paragraphs;

            return data;
        });

        console.log('Homepage Content:', homepageContent);

        // Find and navigate to important pages (like "About", "Services", "Features")
        const links = await page.$$eval('a', (anchors) =>
            anchors
                .map((a) => ({
                    href: a.href,
                    text: a.textContent?.trim() || '',
                }))
                .filter(
                    (link) =>
                        link.text.toLowerCase().includes('about') ||
                        link.text.toLowerCase().includes('services') ||
                        link.text.toLowerCase().includes('features')
                )
        );

        console.log('Important Links:', links);

        // Scrape content from each important page
        let allPageContent = '';
        for (const link of links) {
            console.log(`Navigating to: ${link.href}`);
            await page.goto(link.href, { waitUntil: 'load' });

            const pageContent = await page.evaluate(() => {
                const data = {};

                const headings = Array.from(document.querySelectorAll('h1, h2'))
                    .map((el) => el.textContent?.trim())
                    .filter((text) => text && text.length > 0);

                const paragraphs = Array.from(document.querySelectorAll('p'))
                    .map((el) => el.textContent?.trim())
                    .filter((text) => text && text.length > 0);

                data['headings'] = headings;
                data['paragraphs'] = paragraphs;

                return data;
            });

            allPageContent += `Content from ${link.text}: ${JSON.stringify(pageContent, null, 2)}\n`;
            console.log(`Content from ${link.text}:`, pageContent);
        }

        // Save the result in a txt file with proper formatting
        fs.writeFileSync('scrapedContent.txt', allPageContent);
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}

// URL to scrape
const websiteUrl = 'https://synthiq.io/';

// Run the scraper
scrapeWebsiteDetails(websiteUrl);
