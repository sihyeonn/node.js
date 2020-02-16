#!/usr/bin/env node

const fs = require('fs');

// Import csv
const csv = require('csv-parse/lib/sync');
const file = fs.readFileSync('./excel/movie.csv');
const rs = csv(file.toString('utf-8'));
console.log(rs);

// Import xlsx
const xlsx = require('xlsx');
const file_xlsx = xlsx.readFileSync('./excel/movie.xlsx');
const movie = file_xlsx.Sheets.movie;
const rs2 = xlsx.utils.sheet_to_json(movie);
console.log(rs2);

// Web crawling with axios, cheerio - user agent will be axios
const axios = require('axios');
const cheerio = require('cheerio');
const crawler = async () => {
  let result, $, story;
  for ( let v of rs2 ) {
    result = await axios.get(v.link);
    $ = cheerio.load(result.data); // DOM -> $
    story = $(".story_area .con_tx").text();
    console.log(story);
  }
};
crawler();

// puppeteer
const puppeteer = require('puppeteer');
const crawler2 = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage(); // new tab
  await page.goto(rs2[0].link);
  await page.waitFor(2000); // stay 2 secs
  await page.close();
  await browser.close();
};
crawler2();
