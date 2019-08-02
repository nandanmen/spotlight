# Spotlight

A recreation of the MacOS [Spotlight](https://support.apple.com/en-us/HT204014) search feature. This repo contains the core logic that can be used with any view.

## Usage

The package exposes a `Spotlight` class that must be instantiated with a search context, which is an array of items that spotlight is going to search in. You can then call its only method `getResults` which takes an input string as an argument. It uses this argument to filter through your search context.

```js
const spotlight = new Spotlight(['apple', 'orange', 'melon', 'watermelon'])
spotlight.getResults('melon') // returns ['melon', 'watermelon']
```

## Features

### Autocomplete

- [X] Performs basic autocomplete
- [X] Interprets boolean operators &mdash; AND, OR, NOT

### File Search

- [ ] Narrows search using file metadata; e.g. `kind:folders` will only search folders

### Calculations

- [X] Performs basic arithmetic
- [X] Interprets common math functions such as `sqrt`, `log`, `exp` and the trignometric functions `sin`, `cos`, `tan`

### Definitions and Translations

- [ ] Defines single word queries
- [ ] Interprets the `define` keyword to explicitly define the query
- [ ] Translates words between languages

### Conversions

- [ ] Given a unit of measurement, displays common conversions to other measurements
- [ ] Given a phrase like `1.7m in feet` converts the unit of measurement to the other measurement

### Weather

- [ ] Fetches weather data given the `weather` keyword
