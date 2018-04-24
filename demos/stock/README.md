# Stock Simulator

## Introduction
I was initially intrigued by day trading and the concept of recognizing patterns in candlestick charts
in order find the right time to buy into a stock and the right time to sell. I researched on stock market
simulations but was always disappointed, since it usually displayed in real time with a one to one ratio. I 
wanted to create a quicker application while also using real world data. I decided to use AngularJS as my 
framework because its two way binding really fit well in this application.

## Stock and Google Charts API
The hardest part of the project was to find APIs that allowed for historical data in stocks and a way to graph it.
I used alphavantage's API for stock history. It is a pretty decent API, however it takes around 5 to 30 seconds to load in
data, more if I request a full output. I used google's chart API to draw candlesticks. With data from the stock API, I parsed
it into time, low, open, close, and high and inserted each column into the table. The only issue was wick color, as the google
chart API did not allow for rising and falling wicks to be colored differently.

## Chart
To simulate real time, I created a stack of max size 20. After each update, I would add to the stack and removed the last item if
it was over the max size. By pushing to the google chart API, it imitates what stocks would do in in one second intervals.

## Conclusion
All in all, this was a very fun and rewarding project using AngularJS, google chart API, and alphadvantage API. Challenges including 
reviewing ng-class and other directives, understanding the APIs available, and creating a user friendly display for playing the stock 
market game. Enjoy!

