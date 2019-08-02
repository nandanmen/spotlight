# Spotlight

A recreation of the MacOS [Spotlight](https://support.apple.com/en-us/HT204014) search feature. This repo contains the core logic that can be used with any view.

## Usage

### Search

The package exposes a `Spotlight` class that must be instantiated with a search context, which is an array of items that spotlight is going to search in. You can then call the `getResults` method which takes an input string as an argument. It uses this argument to filter through your search context.

```js
const spotlight = new Spotlight(['apple', 'orange', 'melon', 'watermelon'])
spotlight.getResults('melon') // returns ['melon', 'watermelon']
```

It also supports boolean operators for more complex queries:

```js
spotlight.getResults('melon OR apple NOT water') // returns ['apple', 'melon']
```

### Math

If the input is a valid math expression, Spotlight will attempt to evaluate it (respecting BEDMAS rules):

```js
spotlight.getResults('3 + 3 * 4') // returns [15]
```

It also understands common math functions:

```js
spotlight.getResults('sin(1.5708)') // returns [1]
spotlight.getResults('log(5)') // returns [0.6989]
spotlight.getResults('sqrt(16)') // returns [4]
```

For a full list, see [features](#features).

## Middleware

Spotlight retrieves its results by running the input and search context through several middleware functions. A **middleware** function is a function of the following signature:

```ts
(input: string, context: any[]) => any[]
```

By default Spotlight has the `string` middleware and the `math` middleware installed. The `string` middleware deals with basic string searches and parses boolean operations. The `math` middleware deals with math expressions. These examples are seen above in [usage](#usage).

### Extending

You can add your own middleware using the `extend` method. It takes the new middleware function as its sole argument. For example, if you want your result to always contain `hello world!`:

```js
const spotlight = new Spotlight([])
spotlight.getResults('') // returns []

spotlight.extend((input, context) => ['hello world!'])
spotlight.getResults('') // returns ['hello world!']
```

Note that your middleware function **must return an array**, even though it contains only one element.

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
